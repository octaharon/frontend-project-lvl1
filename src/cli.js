import promptly from "promptly";

export const prompt = async (msg = 'Enter your answer: ') => {
    return await promptly.prompt(msg);
}

export const greeting = async () => {
    const name = await prompt('May I have your name, please: ');
    console.info(`Hello ${name}`);
    return name;
}