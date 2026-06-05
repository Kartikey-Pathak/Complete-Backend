console.log("Function Inside A Function Practice..");

function any(x){
    function inside(x){
        return x*2;
    }
    return inside(x);
}

console.log(any(2));