const db = require("../models");

module.exports={findAll:function(n,o){db.Book
    .find(n.query)
    .sort({date:-1})
    .then(n=>o
        .json(n))
        .catch(n=>o.status(422)
        .json(n))},
        
        findById:function(n,o){db.Book.findById(n.params.id)
            .then(n=>o
                .json(n))
                .catch(n=>o
                    .status(422)
                    .json(n))},
                    
                    create:function(n,o){db.Book
                        .create(n.body)
                        .then(n=>o
                            .json(n))
                            .catch(n=>o
                                .status(422)
                                .json(n))},
                                
                                update:function(n,o)
                                
                                {db.Book.findOneAndUpdate({_id:n.params.id},n.body)
                                .then(n=>o.json(n))
                                .catch(n=>o.status(422)
                                .json(n))},
                                
                                remove:function(n,o)
                                {db.Book.findById({_id:n.params.id})
                                .then(n=>n
                                    .remove())
                                    .then(n=>o
                                        .json(n))
                                        .catch(n=>o
                                            .status(422)
                                            .json(n))}};