  var SatoriWorkerClient, ref,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  SatoriWorkerClient = (function(superClass) {
    extend(SatoriWorkerClient, superClass);

    function SatoriWorkerClient() {
      return SatoriWorkerClient.__super__.constructor.apply(this, arguments);
    }

    SatoriWorkerClient.url = URL.createObjectURL(new Blob([worker_code], {
      type: "text/javascript"
    }));

    SatoriWorkerClient.prototype.worker = function() {
      return this._worker;
    };

    SatoriWorkerClient.prototype.load = function(dirpath) {
      this._worker = new URLWorkerClient(SatoriWorkerClient.url, false);
      return SatoriWorkerClient.__super__.load.call(this, dirpath);
    };

    SatoriWorkerClient.prototype._push = function(dirpath) {
      return this.storage.ghost_master(this.ghostpath).then(function(directory) {
        return directory.asArrayBuffer();
      }).then((function(_this) {
        return function(directory) {
          var data, path, ref, transferable;
          transferable = [];
          ref = _this._satori_ignore_saori(directory);
          for (path in ref) {
            data = ref[path];
            transferable.push(data);
          }
          return _this.worker().request('push', [dirpath, directory], transferable);
        };
      })(this));
    };

    SatoriWorkerClient.prototype._satori_ignore_saori = function(directory) {
      var filestr, path, uint8arr;
      for (path in directory) {
        if (/\bsatori_conf\.txt$/.test(path)) {
          uint8arr = new Uint8Array(directory[path]);
          filestr = Encoding.codeToString(Encoding.convert(uint8arr, 'UNICODE', 'SJIS'));
          if (/＠SAORI/.test(filestr)) {
            filestr = filestr.replace(/＠SAORI/, '＠NO__SAORI');
            directory[path] = new Uint8Array(Encoding.convert(Encoding.stringToCode(filestr), 'SJIS', 'UNICODE')).buffer;
          }
          break;
        }
      }
      return directory;
    };

    return SatoriWorkerClient;

  })(NativeShioriWorkerClient);

  if (((ref = this.ShioriLoader) != null ? ref.shiories : void 0) != null) {
    this.ShioriLoader.shiories.satori = SatoriWorkerClient;
  } else {
    throw "load ShioriLoader first";
  }

}).call(this);
