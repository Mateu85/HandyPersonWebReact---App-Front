export const SerializeForm = (form) => {
    const formData = new FormData(form);
    const completObj = {};

    for(let[name, value] of formData){
        completObj[name] = value;
    }
    return completObj;
}
