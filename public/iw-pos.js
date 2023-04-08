function delay(callback, ms) {
    var timer = 0;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, ms || 0);
    };
}

const el = function(el) {
    var obj = {}
    if (typeof el == 'object') {
        obj.el = el;
    } else {
        obj.el = document.createElement(el);
    }
    obj.ch = [];
    obj.id = function (a) {
        this.el.id = a;
        globalThis[a] = {
            parent: this.el,
            el: globalThis.el(this.el),
            child: function (a) {
                return this.parent.appendChild(a.get())
            }
        }
        return this;
    }
    obj.text = function (a) {
        this.el.style.userSelect = 'none';
        this.el.innerText = a;
        return this;
    }
    obj.addModule = function (name, func){
      this.el[name] = func;
      return this;
    }
    obj.html = function (a) {
        this.el.innerHTML = a;
        return this;
    }
    obj.name = function (a) {
        this.el.setAttribute('name', a);
        return this;
    }
    obj.href = function (a) {
        this.el.setAttribute('href', a);
        return this;
    }
    obj.rel = function (a) {
        this.el.setAttribute('rel', a);
        return this;
    }
    obj.val = function (a) {
        this.el.value = a;
        return this;
    }
    obj.css = function (a, b) {
        if (typeof a == "object") {
            var ky = Object.keys(a);
            ky.forEach(function (item) {
                this.el.style[item] = a[item];
            }, this)
            return this;
        } else {
            this.el.style[a] = b;
            return this;
        }
    }
    obj.change = function (func) {
        this.el.addEventListener('change', func, false);
        return this;
    }
    obj.keydown = function (func) {
        this.el.addEventListener('keydown', func, false);
        return this;
    }
    obj.mouseover = function (func) {
        this.el.addEventListener('mouseover', func, false);
        return this;
    }
    obj.resize = function (func) {
        var gopy = this;
        window.addEventListener('resize', function (e) {
            width = e.target.outerWidth;
            height = e.target.outerHeight;
            var elm = {
                el: gopy.el,
                width: width,
                height: height
            }
            setTimeout(function () {
                func(elm);
            }, 100)
        }, gopy)
        return gopy;
    }
    obj.load = function (func) {
        var gopy = this;
        var width = window.outerWidth;
        var height = window.outerHeight;
        var elm = {
            el: gopy.el,
            width: width,
            height: height
        }
        setTimeout(function () {
            func(elm);
        }, 0)
        return gopy;
    }
    obj.mouseout = function (func) {
        this.el.addEventListener('mouseout', func, false);
        return this;
    }
    obj.keypress = function (func) {
        this.el.addEventListener('keypress', func, false);
        return this;
    }
    obj.click = function (func) {
        this.el.addEventListener('click', func, false);
        return this;
    }
    obj.touchstart = function (func) {
        this.el.addEventListener('touchstart', func, false);
        return this;
    }
    obj.touchend = function (func) {
        this.el.addEventListener('touchend', func, false);
        return this;
    }
    obj.selectNone = function () {
        this.el.style.userSelect = 'none';
        return this;
    }
    obj.submit = function (func) {
        this.el.addEventListener('submit', function (e) {
            
            e.preventDefault();

            el = e.path[0];

            el = new FormData(el);

            var object = {};
            el.forEach(function (value, key) {
                object[key] = value;
            });
            var json = object;

            func(json)

        }, false);
        return this;
    }
    obj.keyup = function (func) {
        this.el.addEventListener('keyup', func, false);
        return this;
    }
    obj.src = function (a) {
        this.el.setAttribute('src', a);
        return this;
    }
    obj.required = function (a) {
        this.el.setAttribute('required', '');
        return this;
    }
    obj.required = function (a) {
        this.el.setAttribute('required', '');
        return this;
    }
    obj.width = function (a) {
        this.el.style.width = a;
        return this;
    }
    obj.margin = function (a) {
        this.el.style.margin = a;
        return this;
    }
    obj.outline = function (a) {
        this.el.style.outline = a;
        return this;
    }
    obj.border = function (a) {
        this.el.style.border = a;
        return this;
    }
    obj.padding = function (a) {
        this.el.style.padding = a;
        return this;
    }
    obj.fixed = function () {
        this.el.style.position = "fixed";
        return this;
    }
    obj.absolute = function () {
        this.el.style.position = "absolute";
        return this;
    }
    obj.relative = function () {
        this.el.style.position = "relative";
        return this;
    }
    obj.static = function () {
        this.el.style.position = "static";
        return this;
    }
    obj.position = function (a) {
        this.el.style.position = a;
        return this;
    }
    obj.radius = function (a) {
        this.el.style.borderRadius = a;
        return this;
    }
    obj.bottom = function (a) {
        this.el.style.bottom = a;
        return this;
    }
    obj.right = function (a) {
        this.el.style.right = a;
        return this;
    }
    obj.left = function (a) {
        this.el.style.left = a;
        return this;
    }
    obj.top = function (a) {
        this.el.style.top = a;
        return this;
    }
    obj.float = function (a) {
        this.el.style.float = a;
        return this;
    }
    obj.color = function (a) {
        this.el.style.color = a;
        return this;
    }
    obj.align = function (a) {
        this.el.style.textAlign = a;
        return this;
    }
    obj.size = function (a) {
        this.el.style.fontSize = a;
        return this;
    }
    obj.fontWeight = function (a) {
        if (a == undefined) {
            a = 'bold';
        }
        this.el.style.fontWeight = a;
        return this;
    }
    obj.background = function (a) {
        this.el.style.background = a;
        return this;
    }
    obj.padding = function (a) {
        this.el.style.padding = a;
        return this;
    }
    obj.marginTop = function (a) {
        this.el.style.marginTop = a;
        return this;
    }
    obj.marginBottom = function (a) {
        this.el.style.marginBottom = a;
        return this;
    }
    obj.marginLeft = function (a) {
        this.el.style.marginLeft = a;
        return this;
    }
    obj.marginRight = function (a) {
        this.el.style.marginRight = a;
        return this;
    }
    obj.backgroundImage = function (a) {
        this.el.style.backgroundImage = "url(" + a + ")";
        return this;
    }
    obj.font = function (a) {
        this.el.style.fontFamily = a;
        return this;
    }
    obj.backgroundSize = function (a) {
        this.el.style.backgroundSize = a;
        return this;
    }
    obj.backgroundRepeat = function (a) {
        this.el.style.backgroundRepeat = a;
        return this;
    }
    obj.backgroundPosition = function (a) {
        this.el.style.backgroundPosition = a;
        return this;
    }
    obj.cursor = function (a) {
        this.el.style.cursor = a;
        return this;
    }
    obj.display = function (a) {
        this.el.style.display = a;
        return this;
    }
    obj.height = function (a) {
        this.el.style.height = a;
        return this;
    }
    obj.placeholder = function (a) {
        this.el.setAttribute('placeholder', a);
        return this;
    }
    obj.hold = function (a) {
        this.el.setAttribute('placeholder', a);
        return this;
    }
    obj.design = function () {
        this.el.setAttribute('contenteditable', true);
        return this;
    }
    obj.class = function (a) {
        if (this.el.className != "") {
            this.el.className += ' ' + a + ' ';
        } else {
            this.el.className += a;
        }
        return this;
    }
    obj.type = function (a) {
        this.el.setAttribute("type", a);
        return this;
    }
    obj.attr = function (a, d) {
        this.el.setAttribute(a, d);
        return this;
    }
    obj.data = function (a, d) {
        this.el.setAttribute('data-' + a, d);
        return this;
    }
    obj.aria = function (a, d) {
        this.el.setAttribute('aria-' + a, d);
        return this;
    }
    obj.get = function () {
        if (this.ch.length != 0) {
            this.ch.forEach(function (item) {
                this.el.appendChild(item)
            }, this)
            return this.el;
        } else {
            return this.el;
        }
    }

    obj.child = function (a) {
        this.ch.push(a.get());
        return this;
    }

    obj.roboto = function(){
        this.el.style.fontFamily = 'Roboto';
        return this;
    }

    obj.font = function(a = 'Roboto'){
        this.el.style.fontFamily = a;
        return this;
    }


    obj.getChild = function (pop) {
        return {
            parent: this.get().children[pop],
            el: globalThis.el(this.get().children[pop]),
            child: function (a) {
                return this.parent.appendChild(a.get())
            }
        }
    }

    obj.row = function (a) {
        var d = div()
            .class('row')

        a.forEach(function (elm) {
            d.child(
                div().class(elm['class']).child(elm['content'])
            )
        }, d);
        this.ch.push(d.get());
        return this;
    }
    return obj;
}

globalThis.el = el;

function tanggal(a) {
    var newDate = new Date();
    if (a != undefined) {
        if (a === "gugus") {
            newDate = new Date(helper.sesiGet('tahun') + '-' + helper.sesiGet('bulan'));
        } else {
            newDate = new Date(a);
        }
    }

    var namaBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    var namaHari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum`at', 'Sabtu'];

    function buat(newDate) {
        var year = newDate.getFullYear();
        var month = (newDate.getMonth() + 1) + '';
        var day = (newDate.getDate()) + '';
        var format = '00';
        var ansMonth = format.substring(0, format.length - month.length) + month;
        var ansDay = format.substring(0, format.length - day.length) + day;
        var dayKnow = ansDay + '-' + ansMonth + '-' + year;
        if (a == null) {
            return "";
        } else {
            return dayKnow;
        }
    }

    function buatN(newDate) {
        var year = newDate.getFullYear();
        var month = newDate.getMonth();
        var day = (newDate.getDate()) + '';
        var format = '00';
        var ansMonth = namaBulan[month];
        var ansDay = format.substring(0, format.length - day.length) + day;
        var dayKnow = ansDay + ' ' + ansMonth + ' ' + year;
        if (a == null) {
            return "";
        } else {
            return dayKnow;
        }
    }

    function buatO(newDate) {
        var year = newDate.getFullYear();
        var month = (newDate.getMonth() + 1) + '';
        var day = (newDate.getDate()) + '';
        var format = '00';
        var ansMonth = format.substring(0, format.length - month.length) + month;
        var ansDay = format.substring(0, format.length - day.length) + day;
        var dayKnow = year + '-' + ansMonth + '-' + ansDay;
        return {
            full: dayKnow,
            day: newDate.getDay()
        };
    }

    function buatNum(newDate) {
        var year = newDate.getFullYear();
        var month = (newDate.getMonth() + 1) + '';
        var day = (newDate.getDate()) + '';
        var format = '00';
        var ansMonth = format.substring(0, format.length - month.length) + month;
        var ansDay = format.substring(0, format.length - day.length) + day;
        var dayKnow = year + ansMonth + ansDay;
        return Number(dayKnow);
    }

    function buatC(newDate) {
        var year = newDate.getFullYear();
        var month = newDate.getMonth();
        var day = newDate.getDate();
        var dateK = new Date(year, month, day);
        return dateK;
    }
    var date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();
    var firstDay = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
    var lastDay = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0)
    var returnData = {
        oneDayMilisecond: 86400000,
        milisecond: newDate.getTime(),
        normal: buatO(newDate).full,
        cek1: buatC(newDate),
        sekarang: buat(newDate),
        sekarang2: buatN(newDate),
        cek2: buatC(firstDay),
        normal2: buatO(firstDay).full,
        awal: buat(firstDay),
        awal2: buatN(firstDay),
        akhir: buat(lastDay),
        akhir2: buatN(lastDay),
        cek3: buatC(lastDay),
        normal3: buatO(lastDay).full,
        angka: buatNum(newDate),
        dayn: namaHari[buatO(newDate).day],
        day: buatO(newDate).day,
        day2n: namaHari[buatO(firstDay).day],
        day2: buatO(firstDay).day,
        day3n: namaHari[buatO(lastDay).day],
        day3: buatO(lastDay).day
    }
    return returnData;
}

const $el = el;

const _id = function(a){
    return document.getElementById(a);
}

const a = function() {
    return el('a')
}

const img = function() {
    return el('img');
}
const label = function() {
    return el('label')
}
const br = function() {
    return el('BR')
}

const div = function() {
    return el('div');
}
const p = function() {
    return el('p');
}
const line = function() {
    return el('hr')
        .css("padding", "0")
        .css("margin", "0")
}
const h1 = function() {
    return el('h1').css("font-family", "baloo");
}
const h2 = function() {
    return el('h2').css("fontFamily", "arima");
}
const h3 = function() {
    return el('h3');
}
const h4 = function() {
    return el('h4');
}
const h5 = function() {
    return el('h5');
}
const h6 = function() {
    return el('h6');
}
const input = function() {
    return el('input');
}
const btn = function() {
    return el('button');
}
const tabel = function() {
    return el('TABLE');
}
const tr = function() {
    return el('TR');
}
const nav = function() {
    return el('nav');
}
const td = function() {
    return el('TD');
}
const th = function() {
    return el('TH');
}
const thead = function() {
    return el('THEAD');
}
const tbody = function() {
    return el('TBODY');
}
const form = function() {
    return el('FORM');
}
const ul = function() {
    return el('ul');
}
const li = function() {
    return el('li');
}
const option = function() {
    return el('option');
}
const textarea = function() {
    return el('textarea');
}

// bootstrap element select
const btSelect = function(text, name, el, act) {
    var a = select().name(name).class('form-control')
        .id(name)
        .child(
            option().val('').text('pilih data')
        )
    if (act != undefined) {
        Object.keys(act).forEach(function (eld) {
            a[eld](act[eld]);
        }, a)
    }
    if (el != undefined) {
        el.forEach(function (item) {
            a.child(
                option().val(item.value).text(item.name)
            )
        }, a)
    }
    var b = div()
        .class('form-group')
        .child(
            label().text(text)
        )
        .child(
            a
        )
    return b;
}

const select = function() {
    return el('select');
}
const span = function() {
    return el('span');
}
const i = function() {
    return el('i');
}
const video = function() {
    return el('video');
}
const canvas = function() {
    return el('canvas');
}
const icon = function(a) {
    return i().class(a)
        .css('cursor', 'pointer')
        .css('fontSize', '30px')
        .css('marginRight', '10px')
        .css('marginLeft', '10px')
        .css('transition', '0.5s')
}

const getElementById = function(a, func){
    setTimeout(function() {
      func(globalThis[a]);
    },100)
}

const domp = function(a, ch) {
    var domp = document.getElementById(a);
    if (domp != null) {
        var parent = domp.parentNode;
        var newd = div().id(a).child(ch);
        parent.replaceChild(newd.get(), domp);
    } else {
        domp.appendChild(ch.get());
    }
}

const dompp = function(a, ch) {
    var domp = a;
    if (domp != null) {
        var parent = domp.parentNode;
        var newd = div().id(a).child(ch);
        parent.replaceChild(newd.get(), domp);
    } else {
        domp.appendChild(ch.get());
    }
}

const dom = function(a, ch) {
    var domp = a;
    domp.appendChild(ch.get());
}

const newStyle = function(ccs) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = ccs;
    document.head.appendChild(style);
}

const prop = function(name, child, value) {
    if (value != undefined && child != undefined) {
        globalThis[name][child] = value
    } else {
        if (value != undefined) {
            return globalThis[name][child]
        } else {
            return globalThis[name]
        }
    }
}

const loadJs = function(url, callback) {
    var script = document.createElement('script');
    script.onload = function () {
        callback()
    };
    script.src = url;
    document.head.appendChild(script);
}

const headConf = function(callback) {
    document.head.innerHTML += callback;
}

const perulangan = function(a, b, c) {
    if (a != undefined && b != undefined && c != undefined) {
        for (i = a; i < b; i++) {
            c(i);
        }
    } else {
        // do nothing
    }
}

const loads = function(arr = [], success, errorf) {
    function loadScript(url) {
        return new Promise(function (resolve, reject) {
            let script = document.createElement("script");
            script.src = url;
            script.async = false;
            script.onload = function () {
                resolve(url);
            };
            script.onerror = function () {
                reject(url);
            };
            document.body.appendChild(script);
        });
    }

    let scripts = arr;

    // save all Promises as array
    let promises = [];
    scripts.forEach(function (url) {
        promises.push(loadScript(url));

    });

    Promise.all(promises)
        .then(function () {
            success();
        })
        .catch(function (script) {
            errorf(script)
        });
}

const childes = function(el = null , err = []){
    var e = el;
    for (let x = 0; x < err.length; x++) {
        if((err.length - 1)== x){
            e = e.getChild(err[x])
        }else{
            e = e.getChild(err[x]).el;
        }
    }
    return e;
}

const decodeEntities = (function() {
  // this prevents any overhead from creating the object each time
  var element = document.createElement('div');

  function decodeHTMLEntities (str) {
    if(str && typeof str === 'string') {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = '';
    }

    return str;
  }

  return decodeHTMLEntities;
})();


  Array.prototype.dinamicSort = function(property){
      var sortOrder = 1;
      if(property[0] === "-") {
          sortOrder = -1;
          property = property.substr(1);
      }
      return function (a,b) {
          /* next line works with strings and numbers,
           * and you may want to customize it to your needs
           */
          var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
          return result * sortOrder;
      }
  };
  
  
  Number.prototype.pad = function(length) {
      var s = this;
      var number = s.valueOf()
      var str = '' + number;
      while (str.length < length) {
          str = '0' + str;
      }
      return str;
  }

  Array.prototype.dinamicSortMultiple = function(){
      /*
       * save the arguments object as it will be overwritten
       * note that arguments object is an array-like object
       * consisting of the names of the properties to sort by
       */
      var dynamicSort = function(property){
          var sortOrder = 1;
          if(property[0] === "-") {
              sortOrder = -1;
              property = property.substr(1);
          }
          return function (a,b) {
              /* next line works with strings and numbers,
               * and you may want to customize it to your needs
               */
              var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
              return result * sortOrder;
          }
      };
      var props = arguments;
      return function (obj1, obj2) {
          var i = 0, result = 0, numberOfProperties = props.length;
          /* try getting a different result from 0 (equal)
           * as long as we have extra properties to compare
           */
          while(result === 0 && i < numberOfProperties) {
              result = dynamicSort(props[i])(obj1, obj2);
              i++;
          }
          return result;
      }
  }

  Array.prototype.sortArrayObjectAsc = function(param){
      var arr = this;
      var dinamicFunc = this.dinamicSort;
      return arr.sort(dinamicFunc(param));
  }

  Array.prototype.sortArrayObjectMultiple = function(){
      var arr = this;
      var props = arguments;
      var dynamicSortMultiple = this.dinamicSortMultiple;
      return arr.sort(dynamicSortMultiple(...props));
  }

  Array.prototype.sortArrayObjectDesc = function(param){
      var arr = this;
      var dinamicFunc = this.dinamicSort;
      return arr.sort(dinamicFunc('-'+param));
  }