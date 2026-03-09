/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID do pedido no MongoDB
 *         orderId:
 *           type: string
 *           description: Número único do pedido
 *         value:
 *           type: number
 *           description: Valor total do pedido
 *         creationDate:
 *           type: string
 *           format: date-time
 *           description: Data de criação do pedido
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: number
 *               quantity:
 *                 type: number
 *               price:
 *                 type: number
 *     OrderInput:
 *       type: object
 *       required:
 *         - numeroPedido
 *         - valorTotal
 *         - items
 *       properties:
 *         numeroPedido:
 *           type: string
 *         valorTotal:
 *           type: number
 *         dataCriacao:
 *           type: string
 *           format: date-time
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               idItem:
 *                 type: string
 *               quantidadeItem:
 *                 type: number
 *               valorItem:
 *                 type: number
 */

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Criar um novo pedido
 *     tags:
 *       - Pedidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderInput'
 *           example:
 *             numeroPedido: "v10089015vdb-01"
 *             valorTotal: 10000
 *             dataCriacao: "2023-07-19T12:24:11.5299601+00:00"
 *             items:
 *               - idItem: "2434"
 *                 quantidadeItem: 1
 *                 valorItem: 1000
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Requisição inválida
 */

/**
 * @swagger
 * /order/list:
 *   get:
 *     summary: Listar todos os pedidos
 *     tags:
 *       - Pedidos
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */

/**
 * @swagger
 * /order/{numeroPedido}:
 *   get:
 *     summary: Obter um pedido específico
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: numeroPedido
 *         required: true
 *         schema:
 *           type: string
 *         description: Número do pedido
 *         example: "v10089015vdb-01"
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Pedido não encontrado
 */

/**
 * @swagger
 * /order/{numeroPedido}:
 *   put:
 *     summary: Atualizar um pedido
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: numeroPedido
 *         required: true
 *         schema:
 *           type: string
 *         description: Número do pedido
 *         example: "v10089015vdb-01"
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderInput'
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Pedido não encontrado
 */

/**
 * @swagger
 * /order/{numeroPedido}:
 *   delete:
 *     summary: Deletar um pedido
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: numeroPedido
 *         required: true
 *         schema:
 *           type: string
 *         description: Número do pedido
 *         example: "v10089015vdb-01"
 *     responses:
 *       200:
 *         description: Pedido deletado com sucesso
 *       404:
 *         description: Pedido não encontrado
 */
