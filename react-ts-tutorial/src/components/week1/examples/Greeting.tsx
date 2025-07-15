interface GreetingProps {
    name: string;
}

function Greeting({ name }: GreetingProps) {
    return <h1>안녕하세요! {name}님!</h1>
}

export default Greeting