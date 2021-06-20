class Employee {
	id: string

	firstname: string

	lastname: string

	preferredDesks: string[]

	constructor(firstname: string, lastname: string) {
		if (!firstname || !lastname) {
			throw new Error('FirstName/LastName must be given')
		}

		this.id = String(Date.now())
		this.firstname = firstname
		this.lastname = lastname
		this.preferredDesks = []
	}
}

export default Employee
