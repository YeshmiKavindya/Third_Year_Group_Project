// Validation middleware for store items
const stockValidation = [
  body('item_name')
    .trim()
    .notEmpty()
    .withMessage('Item name is required')
    .custom(async (item_name) => {
      const existingItem = await StoreItemsInfo.findOne({ item_name });
      if (existingItem) {
        throw new Error('Item name already exists');
      }
      return true;
    }),
  body('quantity')
    .trim()
    .notEmpty()                                                                                       
    .withMessage('Quantity is required')
    .isString()
    .withMessage('Quantity must be a string'),
  body('store_type')
    .trim()
    .notEmpty()
    .withMessage('Store type is required')
    .isIn(['retailer', 'wholesaler'])
    .withMessage('Store type must be either retailer or wholesaler'),
  body('discount')
    .optional()
    .isArray()
    .withMessage('Discount must be an array')
    .custom((discount) => {
      if (discount) {
        discount.forEach((d, index) => {
          if (d.quantity && typeof d.quantity !== 'number') {
            throw new Error(`Discount[${index}].quantity must be a number`);
          }
          if (d.unit_price && typeof d.unit_price !== 'number') {
            throw new Error(`Discount[${index}].unit_price must be a number`);
          }
        });
      }
      return true;
    }),
  
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// POST: Create a new store item
router.post('/item_stock_details', authenticate, stockValidation, handleValidationErrors, async (req, res) => {               
  try {
    const { item_name, quantity, store_type, discount } = req.body;
    const newItem = new StoreItemsInfo({
      item_name,
      quantity,
      store_type,
      discount: discount || [],
      login_date: login_date || Date.now(),
    });
    await newItem.save();
    res.status(201).json({ message: 'Item created successfully', data: newItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET: Retrieve all store items
router.get('/item_stock_details', authenticate, async (req, res) => {
  try {
    const sellerEmail = req.headers['x-email'];
    const items = await StoreItemsInfo.find({ seller_email: sellerEmail });
    res.status(200).json({ message: 'Items retrieved successfully', data: items });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET: Retrieve a single store item by ID
router.get('/item_stock_details/:id', authenticate, async (req, res) => {
  try {
    const item = await StoreItemsInfo.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item retrieved successfully', data: item });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST: Update a store item by ID
router.post(
  '/item_stock_details/update',
  authenticate,
  [
    body('_id')
      .notEmpty()
      .withMessage('Item ID is required'),
    body('item_name')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Item name cannot be empty')
      .custom(async (item_name, { req }) => {
        const existingItem = await StoreItemsInfo.findOne({
          item_name,
          _id: { $ne: req.body._id },
        });
        if (existingItem) {
          throw new Error('Item name already exists');
        }
        return true;
      }),
    body('quantity')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Quantity cannot be empty')
      .isString()
      .withMessage('Quantity must be a string'),
    body('store_type')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Store type cannot be empty')
      .isIn(['retailer', 'wholesaler'])
      .withMessage('Store type must be either retailer or wholesaler'),
    body('discount')
      .optional()
      .isArray()
      .withMessage('Discount must be an array')
      .custom((discount) => {
        if (discount) {
          discount.forEach((d, index) => {
            if (d.minQuantity && typeof d.minQuantity !== 'number') {
              throw new Error(`Discount[${index}].minQuantity must be a number`);
            }
            if (d.discountPercent && typeof d.discountPercent !== 'number') {
              throw new Error(`Discount[${index}].discountPercent must be a number`);
            }
          });
        }
        return true;
      }),
    body('unit_price')
      .optional()
      .isNumeric()
      .withMessage('Unit price must be a number'),
    body('seller_name')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Seller name cannot be empty'),
    body('login_date')
      .optional()
      .isISO8601()
      .withMessage('Invalid date format'),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { _id, item_name, quantity, store_type, discount, unit_price, seller_name, login_date } = req.body;
      const updateData = {};
      if (item_name) updateData.item_name = item_name;
      if (quantity) updateData.quantity = quantity;
      if (store_type) updateData.store_type = store_type;
      if (discount) updateData.discount = discount;
      if (unit_price) updateData.unit_price = unit_price;
      if (seller_name) updateData.seller_name = seller_name;
      if (login_date) updateData.login_date = login_date;

      const item = await StoreItemsInfo.findByIdAndUpdate(
        _id,
        updateData,
        { new: true, runValidators: true }
      );
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.status(200).json({ message: 'Item updated successfully', data: item });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);

// DELETE: Delete a store item by ID
router.delete('/item_stock_details/:id', authenticate, async (req, res) => {
  try {
    const item = await StoreItemsInfo.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/item_stock_details/delete', authenticate, async (req, res) => {
  try {
    const { _id } = req.body;
    const item = await StoreItemsInfo.findByIdAndDelete(_id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/item_stock_details/add', authenticate, async (req, res) => {
  try {
    const {
      item_name,
      quantity,
      store_type,
      discount,
      seller_name,
      unit_price
      
    } = req.body;

    // Validate required fields
    if (!item_name || !quantity || !store_type || !seller_name || !unit_price ) {
      return res.status(400).json({
        message: 'Missing required fields'
      });
    }

    console.log(req.body);

    // Create new item
    const newItem = new StoreItemsInfo({
      item_name,
      quantity,
      store_type,
      discount: discount || [],
      login_date: new Date(),
      seller_name,
      seller_email: req.headers['x-email'],
      unit_price
    
    });

    await newItem.save();

    res.status(201).json({
      message: 'Item added successfully',
      data: newItem
    });

  } catch (error) {
    res.status(500).json({
      message: 'Server error', 
      error: error.message
    });
  }
});