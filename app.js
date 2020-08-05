
var count = 1;
var idEditActual = 0;

function addItem() {
    
    let item = document.getElementById('box');
    let list_item = document.getElementById('listItem');

    if (item.value.trim() !== '' && idEditActual === 0) {

        // Criar o elemento para adicionar na lista
        let criarElementoLi = document.createElement('LI');
        criarElementoLi.appendChild(document.createTextNode(item.value));
        criarElementoLi.setAttribute("id", count++);
        
        /** Adiciona no final da LI um X para remover o item  */
        let spanClose = addRemoveIcon();
        criarElementoLi.appendChild(spanClose);

        /** Adiciona no final da LI um X para remover o item  */
        let spanEditar = addEditIcon();
        criarElementoLi.appendChild(spanEditar);

        /** Adiciona o item na lista */
        list_item.appendChild(criarElementoLi);

        // Adiciona o evento de click para remover e editar o item 
        removeItem(spanClose, criarElementoLi);
        editItem(spanEditar, criarElementoLi);
        
        // limpa o input
        clearInputValue(item);
    } else if (idEditActual !== 0) {

        document.getElementById('listItem').childNodes.forEach(element => {
            if (Number(element.id) === idEditActual) {
                editElement(element, item);
            }
        });
        
    } else {
        alert("Por favor, adicione um item");
        clearInputValue(item);
    }

}

function addRemoveIcon() {
    return createSpan('close glyphicon glyphicon-remove');
}

function addEditIcon() {
    return createSpan('editar glyphicon glyphicon-edit');
}

function createSpan(classes){
    let span = document.createElement('SPAN');
    span.className = classes;
    return span;
}

function removeItem(span, item) {
    span.onclick = function () {
        item.remove();
        this.parentNode.removeChild(this);
    }
}

function editItem(span, item) {
    span.onclick = function () {
        idEditActual = Number(item.id);
        document.getElementById('box').value = item.textContent;
    }
}

function clearInputValue(input) {
    input.value = "";
}

function editElement(element, item) {
    element.textContent = item.value;
    let spanClose = addRemoveIcon();
    let spanEditar = addEditIcon();

    element.appendChild(spanClose);
    element.appendChild(spanEditar);

    removeItem(spanClose, element);
    editItem(spanEditar, element);

    clearInputValue(item);
    idEditActual = 0;
}
