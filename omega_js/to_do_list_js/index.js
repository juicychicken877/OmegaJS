const toDoList = {
    index: 0,
    FIELD_INPUT: document.getElementById('text_input'),
    ADD_BUTTON: document.getElementById('add_button'),
    TEXT_CONTENT_CLASS: 'text_content',
    DELETE_BUTTON_CLASSES: ['delete_button', 'icon-trash'],
    LIST_ITEM_CLASSES: ['list_item', 'box_shadow'],
    LIST: document.getElementById('list'),

    Start() {
        this.ADD_BUTTON.addEventListener('click', () => this.Add())
    }
    ,
    Add() {
        let text = this.FIELD_INPUT.value;

        if (text) {
            let listItem = document.createElement('div');
            let textContentHTML = document.createElement('div');
            let deleteButton = document.createElement('span');
            let x = this.index;

            // list item
            for (let i=0; i<this.LIST_ITEM_CLASSES.length; i++) 
                listItem.classList.add(this.LIST_ITEM_CLASSES[i]);
            
            listItem.dataset.index = this.index;
            // text content
            textContentHTML.classList.add(this.TEXT_CONTENT_CLASS);
            textContentHTML.textContent = text;

            //delete button
            for (let i=0; i<this.DELETE_BUTTON_CLASSES.length; i++)
                deleteButton.classList.add(this.DELETE_BUTTON_CLASSES[i]);

            deleteButton.addEventListener('click', () => this.RemoveListItem(x));

            listItem.appendChild(textContentHTML);
            listItem.appendChild(deleteButton);

            this.index++;

            this.LIST.appendChild(listItem);
            this.FIELD_INPUT.value = '';
        }
    }
    ,
    RemoveListItem(number)
    {
        let object = document.querySelector(`[data-index="${ number }"]`);

        object.remove();
    }
}

document.addEventListener('onload', toDoList.Start())