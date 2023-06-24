import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/utils/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'POST':
			todo.create(req, res);
			break;
		case 'GET':
			todo.findAll(req, res);
			break;
		case 'DELETE':
			todo.delete(req, res);
			break;
		case 'PUT':
		case 'PATCH':
			todo.update(req, res);
			break;
	}
}

const todo: {
	[name: string]: (req: NextApiRequest, res: NextApiResponse) => void;
} = {
	async findAll(req, res) {
		try {
			const todos = await prisma.todo.findMany();

			return res.status(200).json(todos);
		} catch (error) {
			console.error(error);
		}
	},
	async create(req, res) {
		const todo = await prisma.todo.create({
			data: {
				description: req.body.description,
				name: req.body.name,
			},
		});

		return res.status(201).json(todo);
	},
	async delete(req, res) {
		const todo = await prisma.todo.delete({
			where: {
				id: req.body.id,
			},
		});

		return res.status(200).json(todo);
	},
	async update(req, res) {
		const todo = await prisma.todo.update({
			data: {
				...req.body,
			},
			where: {
				id: req.body.id,
			},
		});

		return res.status(200).json(todo);
	},
};
