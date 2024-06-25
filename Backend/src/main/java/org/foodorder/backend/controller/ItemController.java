package org.foodorder.backend.controller;


import org.foodorder.backend.model.CartItem;
import org.foodorder.backend.model.Item;
import org.foodorder.backend.repository.CartRepository;
import org.foodorder.backend.repository.ItemRepository;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ItemController {

    private static final Logger LOGGER = org.slf4j.LoggerFactory.getLogger(ItemController.class);
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private CartRepository cartRepository;

    @GetMapping("/meals")
    public List<Item> getItems() {
        LOGGER.info("Fetching all items");
        return itemRepository.findAll();
    }

    @PostMapping("/addItem")
    public void addToCart(@RequestBody CartItem cartItems) {
        LOGGER.info("Adding item to cart with id");
        LOGGER.info(cartItems.toString());
        CartItem existingCartItem = cartRepository.findById(cartItems.getId()).orElse(null);
        if (existingCartItem != null) {
            existingCartItem.setQuantity(existingCartItem.getQuantity() + 1);
            cartRepository.save(existingCartItem);
        } else {
            cartItems.setQuantity(1);
            cartRepository.save(cartItems);
        }
    }

    @DeleteMapping("/delete/{id}")
    public void removeFromCart(@PathVariable String id) {
        LOGGER.info("Removing item from cart with id: {}", id);
        CartItem cartItem = cartRepository.findById(id).orElse(null);
        if (cartItem != null) {
            if (cartItem.getQuantity() > 1) {
                cartItem.setQuantity(cartItem.getQuantity() - 1);
                cartRepository.save(cartItem);
            } else {
                cartRepository.deleteById(id);
            }
        }
    }

    @GetMapping("/cart")
    public List<CartItem> getCartItems() {
        LOGGER.info("Fetching all items from cart");
        return cartRepository.findAll();
    }


}
