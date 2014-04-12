function DaoBase (Model){
    this.model = Model;
}

DaoBase.prototype.create = function (doc,callback){
    this.model.create(doc, function (error) {
        if(error) return callback(error);
        
        return callback(null);
    });
};


DaoBase.prototype.getById = function (id, callback) {
    this.model.findOne({_id:id}, function(error, model){
        if(error) return callback(error, null);

        return callback(null, model);
    });
};


DaoBase.prototype.countByQuery = function (query, callback) {
    this.model.count(query, function(error, model){
        if(error) return callback(error, null);

        return callback(null, model);
    });
};


DaoBase.prototype.getByQuery = function (query,fileds,opt,callback) {
    this.model.find(query, fileds, opt, function(error, model){
        if(error) return callback(error, null);

        return callback(null, model);
    });
};


DaoBase.prototype.getAll = function (callback) {
    this.model.find({}, function(error, model){
        if(error) return callback(error, null);

        return callback(null, model);
    });
};

DaoBase.prototype.delete = function (query, callback){
    this.model.remove(query, function(error){
        if(error) return callback(error);

        return callback(null);
    });
};


DaoBase.prototype.update = function( conditions, update ,options, callback) {
    this.model.update(conditions, update, options, function (error) {
        if(error) return callback(error);

        return callback(null);
    });
};

module.exports = DaoBase;