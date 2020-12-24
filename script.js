const template = document.createElement('template');

template.innerHTML = `
<style>
button {
     margin: 0;
     border: none;
     border-radius: 0;
     outline: none;
     appearance: none;
     cursor: pointer;
     position: relative;
}

.btn {
    font-size: 20px;
    color: white;
    line-height: 1.4;
    padding: 18px 20px;
    border-radius: 20px;
    background-color: rgb(27, 161, 223);
    box-shadow: 0 3px 0 rgba(0, 0, 0, .3);
    transition: box-shadow .1s top .1s;
}

.btn:hover {
    box-shadow: 0 3px 0 transparent;
    top: 3px;
}

.btn:active {
    background-color: #f2f2f2;
}

.modal {
    pointer-events: none;
    opacity: 0;
    transform: opacity .3s;
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
    margin: 0 auto;
    max-width: 300px;
    padding: 25px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, .3);
    z-index: 100;
}

.overlay {
    pointer-events: none;
    opacity: 0;
    transform: opacity .3s;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    z-index: 100;
}

.is-visible {
    opacity: 1;
    pointer-events: auto;
}
</style>

<button class="btn" id="btn-modal">Thomas Web Component Modal</button>
    <div class="overlay" id="overlay"></div>
    <div class="modal" id="modal">
        <button class="modal-btn-close" id="close-btn">X</button>
        <div>
            <slot name="content">
            This is from web component
            </slot>
        </div>
    
    </div>
`;

//custom component as classname
class ThomasModal extends HTMLElement {
    constructor() {
        super();
        // Create a shadow root
        // sets and returns 'this.shadowRoot'
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    };
    //callback function 
    connectedCallback() {
        this.shadowRoot.getElementById('btn-modal').addEventListener('click', () => {
            this.shadowRoot.getElementById('overlay').classList.add('is-visible');
            this.shadowRoot.getElementById('modal').classList.add('is-visible');
        });
        this.shadowRoot.getElementById('close-btn').addEventListener('click', () => {
            this.shadowRoot.getElementById('overlay').classList.remove('is-visible');
            this.shadowRoot.getElementById('modal').classList.remove('is-visible');
        });
        this.shadowRoot.getElementById('overlay').addEventListener('click', () => {
            this.shadowRoot.getElementById('overlay').classList.remove('is-visible');
            this.shadowRoot.getElementById('modal').classList.remove('is-visible');
        });
        //Is there background attribute in component
        if (this.getAttribute('background')) {
            this.shadowRoot.querySelector('.modal').style.background = this.getAttribute('background')
        }
    }
}

//create Modal ('callname', classname)
window.customElements.define('thomas-modal', ThomasModal)