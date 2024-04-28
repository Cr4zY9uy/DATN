
const checkParent = () => {
    let parentCheckbox = document.getElementsByClassName("parent")[0];
    parentCheckbox.checked = !parentCheckbox.checked;
    let children = document.getElementsByClassName("child");
    for (let i = 0; i < children.length; i++) {
        children[i].checked = parentCheckbox.checked;
    }
}
export default checkParent;