class A {
    public fire() { console.log('fire') }
}
class B extends A { }

function test(ob: A) {
    ob.fire();
}

test(new B())