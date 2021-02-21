interface Tasks {
    handle: () => void
}

class GoToTheShop implements Tasks {
    public handle() {
        console.log('go to the shop');

    }
}

class FeedTheCat implements Tasks {
    public handle() {
        console.log("Feed The Cat");

    }
}
class LearnTS implements Tasks {
    public handle() {
        console.log("Learn TS");

    }
}

interface ComponentClass {
    new(): Tasks;
}

class App {
    constructor(private tasks: ComponentClass[]) {
        this.tasks = tasks
    }

    public handle(): void {
        this.tasks.forEach(task => (new task()).handle())
    }
}

/*  ===============  client code   ===================  */

const store: ComponentClass[] = [GoToTheShop, FeedTheCat, LearnTS];
let app = new App(store)
app.handle();