import IdeasApi from '../services/ideasApi';

class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector('#idea-list');
    // this will be filled from the API
    this._ideas = [];
    this.getIdeas();
    // create new Set of tags
    this._validTags = new Set();
    // add tags to the Set
    this._validTags.add('technology');
    this._validTags.add('software');
    this._validTags.add('business');
    this._validTags.add('education');
    this._validTags.add('health');
    this._validTags.add('inventions');
  }

  addEventListeners() {
    // add event listener to the div containing an idea
    this._ideaListEl.addEventListener('click', (e) => {
      // if the element we click on has a class same as delete button
      if (e.target.classList.contains('fa-times')) {
        // we want this to happen only if we click the delete icon so we stop event propagation
        e.stopImmediatePropagation();
        // get the id of the idea by targeting the parent element twice because the parent of an icon is the button but we need the div
        // whenever we use custom data attribute we can get them by using dataset and the name of the custom attribute
        const ideaId = e.target.parentElement.parentElement.dataset.id;
        // use custom method to delete idea from the DOM
        this.deleteIdea(ideaId);
      }
    });
  }

  //? Method to fetch Ideas from our backend
  async getIdeas() {
    try {
      // response from the axios get request
      const response = await IdeasApi.getIdeas();
      // when we make request with axios the data is in an object called data, we need to chain another .data because how we build our backend
      this._ideas = response.data.data;
      // display fetched ideas in the UI
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  //? Method to delete Ideas from our backend and the DOM
  async deleteIdea(ideaId) {
    try {
      // Delete from the server
      const res = await IdeasApi.deleteIdea(ideaId);
      // to delete it from the dom we need to filter it, this filter method is gonna return all ideas but the one we wanna delete
      this._ideas.filter((idea) => idea._id !== ideaId);
      // get again ideas
      this.getIdeas();
    } catch (error) {
      alert('You cannot delete this resource');
    }
  }

  addIdeaToList(idea) {
    // take our array of ideas and add the new idea to it
    this._ideas.push(idea);
    this.render();
  }

  // method to get a tag corresponding with a correct css class
  getTagClass = (tag) => {
    // make them lowerCase
    tag = tag.toLowerCase();
    let tagClass = '';

    // check if the tag is in the set
    if (this._validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    } else {
      // if it's not present in the set we don't add more classes
      tagClass = '';
    }
    return tagClass;
  };

  render() {
    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {
        // create helper variable which stores the tag class
        const tagClass = this.getTagClass(idea.tag);
        // create helper variable to conditionally output delete button if the username matches with that who created the idea
        const deleteBtn =
          idea.username === localStorage.getItem('username')
            ? `<button class="delete"><i class="fas fa-times"></i></button>`
            : '';
        return `
        <div class="card" data-id="${idea._id}"> 
          ${deleteBtn}
          <h3>${idea.text}</h3>
          <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
          <p>
            Posted on <span class="date">${idea.data}</span> by
            <span class="author">${idea.username}</span>
          </p>
        </div>
      `;
      })
      .join(''); // join will turn those arrays into strings
    // we need to call method to add event listeners after the HTML is rendered
    this.addEventListeners();
  }
}

export default IdeaList;
