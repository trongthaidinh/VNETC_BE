let abc = [{name:'name 1'},{name:'nam2'}]

abc.forEach((element,index) => {
    abc[index].age = 12 
});
console.log(abc);