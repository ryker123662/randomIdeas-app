class Modal {
  constructor() {
    // grab modal
    this._modal = document.querySelector('#modal');
    this._modalBtn = document.querySelector('#modal-btn');
    // call event listener right away
    this.addEventListeners();
  }

  addEventListeners() {
    this._modalBtn.addEventListener('click', this.open.bind(this));
    window.addEventListener('click', this.outsideClick.bind(this));
    // event to close the modal
    document.addEventListener('closemodal', () => {
      this.close();
    });
  }

  open() {
    this._modal.style.display = 'block';
  }

  close() {
    this._modal.style.display = 'none';
  }

  outsideClick(e) {
    // check what is being clicked
    if (e.target === this._modal) {
      this.close();
    }
  }
}

export default Modal;
