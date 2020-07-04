// credit https://github.com/FrontendMasters/hardcore-functional-js-v2/blob/master/types.js

type func = (x: any) => any
type funcWithSpreadableArgs = (x?: any) => any
type funcReturningTask = (x: any) => TaskFn
type funcWithSpreadableArgsReturningTask = (f: func, g: func) => TaskFn

interface TaskFn {
    fork: any,
    ap: funcReturningTask;
    map: funcReturningTask;
    chain: funcReturningTask;
    concat: funcReturningTask;
    fold: funcWithSpreadableArgsReturningTask;
}

interface TaskObj {
    of?: funcReturningTask;
    rejected?: funcReturningTask;
    fromPromised?: any
}

interface Task extends TaskObj {
    (fork: any): TaskFn;
}

const Task: Task = (fork: any) => ({
    fork,
    ap: (other) => Task((rej: func, res: func) => fork(rej, (f: func) => other.fork(rej, (x: any) => res(f(x))))),
    map: (f: func) => Task((rej: func, res: func) => fork(rej, (x: any) => res(f(x)))),
    chain: (f: func) => Task((rej: func, res: func) => fork(rej, (x: any) => f(x).fork(rej, res))),
    concat: (other) =>
        Task((rej: func, res: func) =>
            fork(rej, (x: any) =>
                other.fork(rej, (y: any) => {
                    console.log('X', x, 'Y', y);
                    res(x.concat(y));
                }),
            ),
        ),
    fold: (f: func, g: func) =>
        Task((rej: func, res: func) =>
            fork(
                (x: any) => f(x).fork(rej, res),
                (x: any) => g(x).fork(rej, res),
            ),
        ),
});

Task.of = (x: any) => Task((rej: func, res: func) => res(x));
Task.rejected = (x: any) => Task((rej: func, res: func) => rej(x));
Task.fromPromised = (fn: funcWithSpreadableArgs) => (...args: any[]) =>
    Task((rej: func, res: func) =>
        fn(...args)
            .then(res)
            .catch(rej),
    );

export { Task };
