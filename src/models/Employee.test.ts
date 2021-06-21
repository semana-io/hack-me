import Employee from './Employee'

test('should throw error on constructor', () => {
	expect(() => {
		new Employee('', 'lastname')
	}).toThrowError()
})

test('should return instance of employee', () => {
	const e = new Employee('Jean', 'Paul')
	expect(e).toHaveProperty('firstname', 'Jean')
	expect(e).toHaveProperty('lastname', 'Paul')
})
