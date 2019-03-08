const add = (a,b) => a + b;
const generateGreeting = (name) => `Hello ${name}`;

test('should display my name', () => {
    expect(generateGreeting('jose')).toBe('Hello jose');
});