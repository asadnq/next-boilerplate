import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const uuid1 = '20b65642-701c-412b-91eb-53929da50d86';
	const item1 = await prisma.todo.upsert({
		where: {
			id: uuid1,
		},
		update: {},
		create: {
			name: 'Implement Route API',
			description: '',
			isActive: false,
		},
	});
	const uuid2 = '91ad27d9-69a6-47d2-8934-74369d631096';
	const item2 = await prisma.todo.upsert({
		where: { id: uuid2 },
		update: {},
		create: {
			name: 'Add automated tet',
			description: 'unit test, mock api, e2e test, etc.',
		},
	});
	console.log({ item1, item2 });
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
