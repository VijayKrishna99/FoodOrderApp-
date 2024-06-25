package org.foodorder.backend.repository;

import org.foodorder.backend.model.Item;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface ItemRepository extends MongoRepository<Item, String>{
}
