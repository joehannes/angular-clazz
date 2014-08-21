// Generated by CoffeeScript 1.7.1
(function() {
  var module,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module = angular.module("angular-clazz", ['pouchdb']);

  module.provider("Clazz", function() {
    var OO, _DB;
    _DB = angular.injector(['pouchdb']).get('pouchdb');
    OO = {};
    OO.Injectable = (function() {
      function Injectable() {}

      Injectable.inject = function() {
        var args, injectee, _i, _len, _ref, _ref1;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        _ref1 = __slice.call((_ref = this.$inject) != null ? _ref : []).concat(["$scope"]);
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          injectee = _ref1[_i];
          if (args.indexOf(injectee) === -1) {
            args.push(injectee);
          }
        }
        this.$inject = args;
        return this;
      };

      return Injectable;

    })();
    OO.Ctrl = (function(_super) {
      __extends(Ctrl, _super);

      Ctrl.register = function(app, name) {
        var _ref;
        if (name == null) {
          name = this.name || ((_ref = this.toString().match(/function\s*(.*?)\(/)) != null ? _ref[1] : void 0);
        }
        if (typeof app === "string") {
          angular.module(app).controller(name, this);
        } else {
          app.controller(name, this);
        }
        return this;
      };

      Ctrl.mixin = function() {
        var Mixed, method, mixin, mixins, name, _fn, _i, _len, _ref;
        mixins = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        Mixed = (function(_super1) {
          __extends(Mixed, _super1);

          function Mixed() {
            return Mixed.__super__.constructor.apply(this, arguments);
          }

          return Mixed;

        })(this);
        for (_i = 0, _len = mixins.length; _i < _len; _i++) {
          mixin = mixins[_i];
          _ref = mixin.prototype;
          _fn = function() {
            var m, n, _m;
            m = method;
            _m = Mixed.prototype[name];
            n = name;
            if (name === "initialize" && (Mixed.prototype.initialize != null)) {
              return Mixed.prototype.initialize = function() {
                m.call(this);
                return _m.call(this);
              };
            } else if (name !== "constructor" && (Mixed.prototype[name] == null)) {
              return Mixed.prototype[name] = m;
            }
          };
          for (name in _ref) {
            method = _ref[name];
            _fn();
          }
          for (name in mixin) {
            if (!__hasProp.call(mixin, name)) continue;
            method = mixin[name];
            if (angular.isFunction(method)) {
              Mixed[name] = method;
            }
          }
          Mixed.inject.apply(Mixed, mixin.$inject);
        }
        return Mixed;
      };

      Ctrl["implements"] = function() {
        var Interface, Interfaced, interfaces, _fn, _i, _len;
        interfaces = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        Interfaced = (function(_super1) {
          __extends(Interfaced, _super1);

          function Interfaced() {
            return Interfaced.__super__.constructor.apply(this, arguments);
          }

          return Interfaced;

        })(this);
        _fn = function(Interface) {
          return Interfaced.prototype[Interface] = function() {
            throw {
              msg: "Looks like the interface _" + Interface + "_ hasn't been implemented! This will lead to unpredictable behaviour!"
            };
          };
        };
        for (_i = 0, _len = interfaces.length; _i < _len; _i++) {
          Interface = interfaces[_i];
          _fn(Interface);
        }
        return Interfaced;
      };

      function Ctrl() {
        var args, fn, index, key, _i, _len, _ref, _ref1;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        _ref = this.constructor.$inject;
        for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
          key = _ref[index];
          this[key] = args[index];
        }
        _ref1 = this.constructor.prototype;
        for (key in _ref1) {
          fn = _ref1[key];
          if (typeof fn === "function" && ["constructor", "initialize"].indexOf(key) === -1 && key[0] !== "_") {
            (function(_this) {
              return (function(key, fn) {
                var el, i, t, _j, _len1, _ref2, _ref3, _ref4, _ref5, _results;
                if (key.match("::")) {
                  console.log(key);
                  t = key.split("::");
                  _ref5 = t[0] && Sizzle(t[0], (_ref2 = (_ref3 = _this.element) != null ? _ref3.context : void 0) != null ? _ref2 : document.body) || [(_ref4 = _this.$element) != null ? _ref4.context : void 0];
                  _results = [];
                  for (i = _j = 0, _len1 = _ref5.length; _j < _len1; i = ++_j) {
                    el = _ref5[i];
                    _results.push((function(el, i) {
                      var listenerO;
                      listenerO = [t[1]];
                      if (t[2] != null) {
                        listenerO.push(t[2]);
                      }
                      listenerO.push(function() {
                        var args, ev, j, _k, _len2, _ref6;
                        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
                        console.log(key);
                        if (t[2] != null) {
                          ev = args[0];
                          _ref6 = $(ev.currentTarget).parent().children().get();
                          for (j = _k = 0, _len2 = _ref6.length; _k < _len2; j = ++_k) {
                            el = _ref6[j];
                            if (el === ev.currentTarget) {
                              i = j;
                            }
                          }
                        }
                        _this.$scope.n = i;
                        fn.apply(_this, args);
                        if (!_this.$scope.$$phase) {
                          return _this.$scope.$digest();
                        }
                      });
                      return angular.element(el).on.apply(angular.element(el), listenerO);
                    })(el, i));
                  }
                  return _results;
                } else {
                  return _this.$scope[key] = function() {
                    var args;
                    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
                    fn.apply(_this, args);
                    return _this;
                  };
                }
              });
            })(this)(key, fn);
          }
        }
        if (typeof this.initialize === "function") {
          this.initialize();
        }
      }

      return Ctrl;

    })(OO.Injectable);
    OO.DB = (function(_super) {
      __extends(DB, _super);

      function DB() {
        return DB.__super__.constructor.apply(this, arguments);
      }

      DB.inject("$resource", "$interval");

      DB.prototype._createDB = function(api, name, volatile) {
        var _base;
        this.volatile = volatile != null ? volatile : false;
        if ((_base = this.$scope).db == null) {
          _base.db = {};
        }
        if (this.api == null) {
          this.api = {};
        }
        this.$scope.db[name] = {
          busy: false,
          handle: api != null ? this.$resource(api) : null,
          raw: [],
          store: this.volatile && [] || _DB.create(name)
        };
        if (this instanceof OO.View) {
          return this.$interval(((function(_this) {
            return function() {
              return _this._api(name);
            };
          })(this)), 7000);
        } else if (this instanceof OO.Widget) {
          this._listen(name);
          return this.$scope.db[name].store.info().then((function(_this) {
            return function(info) {
              if (parseInt(info.doc_count) === 0) {
                return _this._api(name);
              } else {
                return _this._broadcast(name, {
                  db: _this.$scope.db[name].store,
                  doc: [],
                  count: parseInt(info.doc_count)
                });
              }
            };
          })(this))["catch"](function(err) {
            console.log("error in db " + name + " while trying to see if it existed already ...");
            throw err.toString();
          });
        }
      };

      DB.prototype._api = function(name) {
        if (this.$scope.db[name].busy === true) {
          return;
        }
        this.$scope.db[name].busy = true;
        return this.$scope.db[name].handle.get().$promise.then((function(_this) {
          return function(data) {
            _this._store(name, data);
            return _this.$scope.db[name].busy = false;
          };
        })(this));
      };

      DB.prototype._store = function(name, data) {
        var o, _fn, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref10, _ref11, _ref12, _ref13, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _results;
        if (!this.volatile) {
          _ref2 = (_ref = (_ref1 = data.contents) != null ? _ref1 : data.content) != null ? _ref : data;
          _results = [];
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            o = _ref2[_i];
            _results.push((function(_this) {
              return function(o) {
                return _this.$scope.db[name].store.query(function(doc, emit) {
                  if (doc.id === o.id) {
                    return emit(doc);
                  }
                }).then(function(doc) {
                  console.info('#Data for id _#{o.id}_ will be updated now');
                  if (doc.error !== "not_found" && doc.total_rows === 1) {
                    o._id = doc.rows[0].key._id;
                    return o._rev = doc.rows[0].key._rev;
                  }
                })["catch"](function(err) {
                  console.warn("db error: couldn't query for " + o.id);
                  throw err.toString();
                })["finally"](function() {
                  var args;
                  args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
                  return _this.$scope.db[name].store.put(o, o.id, o._rev).then(function(response) {
                    return _this._broadcast(name, {
                      db: _this.$scope.db[name].store,
                      doc: [o],
                      count: 1
                    });
                  })["catch"](function(err) {
                    console.warn("db error: couldn't put " + (o.toString()));
                    throw err.toString();
                  });
                });
              };
            })(this)(o));
          }
          return _results;
        } else {
          _ref3 = this.$scope.db[name].store;
          for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
            o = _ref3[_j];
            o.deleted = true;
          }
          _ref6 = (_ref4 = (_ref5 = data.contents) != null ? _ref5 : data.content) != null ? _ref4 : data;
          _fn = (function(_this) {
            return function(o) {
              var i, k, v;
              if ((i = _this.$scope.db[name].store.findIndex(function(el) {
                return el.id === o.id;
              })) !== -1) {
                for (k in o) {
                  if (!__hasProp.call(o, k)) continue;
                  v = o[k];
                  _this.$scope.db[name].store[i][k] = o[k];
                }
                return _this.$scope.db[name].store[i].deleted = false;
              } else {
                _this.$scope.db[name].store.push(o);
                return _this.$scope.db[name].store[_this.$scope.db[name].store.length - 1].deleted = false;
              }
            };
          })(this);
          for (_k = 0, _len2 = _ref6.length; _k < _len2; _k++) {
            o = _ref6[_k];
            _fn(o);
          }
          return this._broadcast(name, {
            db: this.$scope.db[name].store,
            doc: (_ref7 = (_ref8 = data.contents) != null ? _ref8 : data.content) != null ? _ref7 : data,
            count: (_ref9 = (_ref10 = (_ref11 = (_ref12 = data.contents) != null ? _ref12.length : void 0) != null ? _ref11 : (_ref13 = data.content) != null ? _ref13.length : void 0) != null ? _ref10 : data.length) != null ? _ref9 : 0
          });
        }
      };

      DB.prototype._broadcast = function(name, data) {
        return this.$scope.$broadcast("db.changed." + name, data);
      };

      DB.prototype._listen = function(name) {
        return this.$scope.$on("db.changed." + name, (function(_this) {
          return function() {
            var args, ev;
            ev = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            args.unshift(name);
            return _this._transform.apply(_this, args);
          };
        })(this));
      };

      return DB;

    })(OO.Injectable);
    OO.View = (function(_super) {
      __extends(View, _super);

      function View() {
        return View.__super__.constructor.apply(this, arguments);
      }

      View.inject();

      return View;

    })(OO.Ctrl);
    OO.DynamicView = (function(_super) {
      __extends(DynamicView, _super);

      function DynamicView() {
        return DynamicView.__super__.constructor.apply(this, arguments);
      }

      return DynamicView;

    })(OO.View.mixin(OO.DB));
    OO.Widget = (function(_super) {
      __extends(Widget, _super);

      function Widget() {
        return Widget.__super__.constructor.apply(this, arguments);
      }

      Widget.inject("$element");

      return Widget;

    })(OO.Ctrl);
    OO.DynamicWidget = (function(_super) {
      __extends(DynamicWidget, _super);

      function DynamicWidget() {
        return DynamicWidget.__super__.constructor.apply(this, arguments);
      }

      return DynamicWidget;

    })(OO.Widget.mixin(OO.DB)["implements"]("_transform"));
    this.$get = function() {
      return OO;
    };
  });

}).call(this);
