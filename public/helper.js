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

globalThis.ArrayNumberExample = [0,1,2,3,4,5,6,7,8,9];

Array.prototype.asc = function(param){
    return this.sort();
}

Array.prototype.sum = function(){
    function myFunc(total, num) {
      return total + num;
    }
    if(this.length > 0){
        return this.reduce(myFunc);
    }else{
        return 0;
    }
}

Array.prototype.desc = function(param){
    return this.reverse();
}

globalThis.ArrayObjectExample = [
    {Name: "Name", Surname: "Surname"},
    {Name:"AAA", Surname:"ZZZ"},
    {Name: "Name", Surname: "AAA"}
];

String.prototype.FirstUpper = function(){
  var val = this.toLowerCase();
  return val.charAt(0).toUpperCase() + val.slice(1);
}

String.prototype.number = function(fn = false){
    var s = this;
    if(fn == 2){
        s = s.replace(/\./g, ',');
    }
    if(fn != 2){
      s = s.replace(/[^-,\d]/g, '');
    }
    if(s == null){
        s = '0';
    }
    if(fn == false){
      if(s == '-'){
        return '-';
      }else if(s == ''){
          return '';
      }else{
        return Number(s.replace(/\./g,'').replace(/\,/g,'.'));
      }
    }else if(fn == true){
        return s.replace(/\./g,'');
    }else if(fn == 2){
        return Number(s.replace(/\,/g, '.'));
    }else{
        return Number(s.replace(/\./g,'').replace(/\,/g,'.'));
    }
}

Array.prototype.count = function (a, val) {
    var t = this
    if(a != undefined && val != undefined){
        return t.filter(function(dat,x){
            if(dat[a] == val){
                return dat;
            }
        }).length
    }else{
        return 0;
    }
}

Array.prototype.row = function (a, val) {
    var t = this
    if(a != undefined && val != undefined){
        var g = t.filter(function(dat,x){
            if(dat[a] == val){
                return dat;
            }
        })
        if(g.length > 0){
            return g[0];
        }else{
            return g;
        }
    }else{
        return t
    }
}

Array.prototype.del = function (a, val) {
    var t = this
    if(a != undefined && val != undefined){
        return t.filter(function(dat,x){
            if(dat[a] != val){
                return dat;
            }
        })
    }else{
        return t
    }
}

String.prototype.lastDotToComa = function(){
    var s = this;
    var l = this.length - 1;
    var sl = s.slice(0, l);
    if(s[l] == '.'){
        return sl+',';
    }else{
        return s+'';
    }
}

window.ifnull = function(a, b){
    if(a == null){
        return b;
    }else{
        return a;
    }
}

window.nullif = function(a, b){
    if(a == b){
        return null;
    }else{
        return a;
    }
}

String.prototype.capitaize = function(){
    var str = this;
    return str.toLowerCase().replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase())
}

String.prototype.Upper = function(){
    var str = this;
    return str.toLowerCase().replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase())
}

String.prototype.formatRupiah = function(){
    var angka = this;
    if(angka == null || angka == ''){
        angka = 0;
        angka = angka.toFixed(2).replace(/\./g, ',');
    }
    var negative = '';
    if (angka[0] == '-') {
        negative = '-';
    }
    var angka = angka.replace(/\./g, ',')
    var prefix;
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
    split           = number_string.split(','),
    sisa            = split[0].length % 3,
    rupiah          = split[0].substr(0, sisa),
    ribuan          = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if(ribuan){
        var separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? negative+rupiah : (rupiah ? '' + negative+rupiah : '');
}

String.prototype.t2b = function(){
    var string = JSON.stringify(this);
    return string.split('').map(function (char) {
        return char.charCodeAt(0).toString(2);
    }).join('2');
}

String.prototype.b2t = function(){
    var array = this.split("2");
    var pop = array.map(code => String.fromCharCode(parseInt(code, 2))).join("");
    return JSON.parse(pop);
}

String.prototype.left = function(number){
    return this.substring(0,number);
}

Array.prototype.t2b = function(){
    var string = JSON.stringify(this);
    return string.split('').map(function (char) {
        return char.charCodeAt(0).toString(2);
    }).join('2');
}

Array.prototype.duplikasi = function(name){
    var arr = this.sortArrayObjectAsc(name);
    var cek = null;
    var baru = [];
    arr.forEach(function(d,i){
        if(cek != d[name]){
            baru.push(d);
            cek = d[name];
        }
    })
    return baru;
}

window.t2b = function(){
    var string = this.toString();
    return string.split('').map(function (char) {
        return char.charCodeAt(0).toString(2);
    }).join('2');
};

String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};

String.prototype.parse = function(){
    return JSON.parse(this);
}

String.prototype.textonly = function(){
    return this.replace(/[^a-zA-Z]+/g, '');
}

Array.prototype.search = function(search = ''){

    if(typeof search == 'number'){
        search = search.toString().toLowerCase();
    }else{
        search = search.toLowerCase();
    }

    var data = this;
    return data.filter(function(dat){
        if(typeof dat == 'object'){
            var f = Object.keys(dat);
            var numcek = 0;
            for(var t of f){
                var g = dat[t];
                if(g != null){
                    if(typeof g == 'number'){
                        g = g.toString().toLowerCase();
                    }else{
                        g = g.toLowerCase();
                    }
                    if(numcek == 0){
                        if(g.indexOf(search) != -1){
                            numcek = 1;
                        }
                    }
                }
            }
            if(numcek == 1){
                return dat;
            }
        }else{
            if(dat != null){
                if(typeof dat == 'number'){
                    var dats = dat.toString().toLowerCase();
                    if(dats.indexOf(search) != -1){
                        return dat
                    }
                }else{
                    if(dat.indexOf(search) != -1){
                        return dat
                    }
                }
            }
        }
    })
}

Array.prototype.cond = function(search = '', name = ''){
    if(search != ''){
        if(typeof search == 'number'){
            search = search.toString().toLowerCase();
        }else{
            search = search.toLowerCase();
        }

        var data = this;
        return data.filter(function(dat){
            if(typeof dat == 'object'){
                var g = dat[name];
                var numcek = 0;
                if(g != null){
                    if(typeof g == 'number'){
                        g = g.toString().toLowerCase();
                    }else{
                        g = g.toLowerCase();
                    }
                    if(numcek == 0){
                        if(g == search){
                            numcek = 1;
                        }
                    }
                }
                if(numcek == 1){
                    return dat;
                }
            }else{
                if(dat != null){
                    if(typeof dat == 'number'){
                        var dats = dat.toString().toLowerCase();
                        if(dats  == search){
                            return dat
                        }
                    }else{
                        if(dat.toLowerCase() == search){
                            return dat
                        }
                    }
                }
            }
        })
    }else{
        return this;
    }
}

Array.prototype.count = function (a, val) {
    var t = this
    if(a != undefined && val != undefined){
        return t.filter(function(dat,x){
            if(dat[a] == val){
                return dat;
            }
        }).length
    }else{
        return 0;
    }
}

Array.prototype.row = function (a, val) {
    var t = this
    if(a != undefined && val != undefined){
        var g = t.filter(function(dat,x){
            if(dat[a] == val){
                return dat;
            }
        })
        if(g.length > 0){
            return g[0];
        }else{
            return g;
        }
    }else{
        return t
    }
}

Array.prototype.del = function (a, val) {
    var t = this
    if(a != undefined && val != undefined){
        return t.filter(function(dat,x){
            if(dat[a] != val){
                return dat;
            }
        })
    }else{
        return t
    }
}

String.prototype.currency = function(){
    var s = this;
    s = s.replace(/\,/g, '.');
    if(s != ''){
      s = this.formatRupiah();
    }
    return s;
}

String.prototype.lastDotToComa = function(){
    var s = this;
    var l = this.length - 1;
    var sl = s.slice(0, l);
    if(s[l] == '.'){
        return sl+',';
    }else{
        return s+'';
    }
}

window.ifnull = function(a, b){
    if(a == null){
        return b;
    }else{
        return a;
    }
}

window.nullif = function(a, b){
    if(a == b){
        return null;
    }else{
        return a;
    }
}

String.prototype.capitaize = function(){
    var str = this;
    return str.toLowerCase().replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase())
}

String.prototype.formatRupiah = function(){
    var angka = this;
    if(angka == null || angka == ''){
        angka = 0;
        angka = angka.toFixed(2).replace(/\./g, ',');
    }
    var negative = '';
    if (angka[0] == '-') {
        negative = '-';
    }
    var angka = angka.replace(/\./g, ',')
    var prefix;
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
    split           = number_string.split(','),
    sisa            = split[0].length % 3,
    rupiah          = split[0].substr(0, sisa),
    ribuan          = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if(ribuan){
        var separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? negative+rupiah : (rupiah ? '' + negative+rupiah : '');
}

Number.prototype.currency = function(a){
    var s = this;
    if(s == null){
        s = 0;
    }
    var num = s.valueOf().toFixed(a).formatRupiah();
    return num;
}

String.prototype.t2b = function(){
    var string = JSON.stringify(this);
    return string.split('').map(function (char) {
        return char.charCodeAt(0).toString(2);
    }).join('2');
}

String.prototype.b2t = function(){
    var array = this.split("2");
    var pop = array.map(code => String.fromCharCode(parseInt(code, 2))).join("");
    return JSON.parse(pop);
}

String.prototype.left = function(number){
    return this.substring(0,number);
}

Array.prototype.t2b = function(){
    var string = JSON.stringify(this);
    return string.split('').map(function (char) {
        return char.charCodeAt(0).toString(2);
    }).join('2');
}

Array.prototype.duplikasi = function(name){
    var arr = this.sortArrayObjectAsc(name);
    var cek = null;
    var baru = [];
    arr.forEach(function(d,i){
        if(cek != d[name]){
            baru.push(d);
            cek = d[name];
        }
    })
    return baru;
}

window.t2b = function(){
    var string = this.toString();
    return string.split('').map(function (char) {
        return char.charCodeAt(0).toString(2);
    }).join('2');
};

String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};

Array.prototype.search = function(search = ''){

    if(typeof search == 'number'){
        search = search.toString().toLowerCase();
    }else{
        search = search.toLowerCase();
    }

    var data = this;
    return data.filter(function(dat){
        if(typeof dat == 'object'){
            var f = Object.keys(dat);
            var numcek = 0;
            for(var t of f){
                var g = dat[t];
                if(g != null){
                    if(typeof g == 'number'){
                        g = g.toString().toLowerCase();
                    }else{
                        g = g.toLowerCase();
                    }
                    if(numcek == 0){
                        if(g.indexOf(search) != -1){
                            numcek = 1;
                        }
                    }
                }
            }
            if(numcek == 1){
                return dat;
            }
        }else{
            if(dat != null){
                if(typeof dat == 'number'){
                    var dats = dat.toString().toLowerCase();
                    if(dats.indexOf(search) != -1){
                        return dat
                    }
                }else{
                    if(dat.indexOf(search) != -1){
                        return dat
                    }
                }
            }
        }
    })
}

Array.prototype.cond = function(search = '', name = ''){
    if(search != ''){
        if(typeof search == 'number'){
            search = search.toString().toLowerCase();
        }else{
            search = search.toLowerCase();
        }

        var data = this;
        return data.filter(function(dat){
            if(typeof dat == 'object'){
                var g = dat[name];
                var numcek = 0;
                if(g != null){
                    if(typeof g == 'number'){
                        g = g.toString().toLowerCase();
                    }else{
                        g = g.toLowerCase();
                    }
                    if(numcek == 0){
                        if(g == search){
                            numcek = 1;
                        }
                    }
                }
                if(numcek == 1){
                    return dat;
                }
            }else{
                if(dat != null){
                    if(typeof dat == 'number'){
                        var dats = dat.toString().toLowerCase();
                        if(dats  == search){
                            return dat
                        }
                    }else{
                        if(dat.toLowerCase() == search){
                            return dat
                        }
                    }
                }
            }
        })
    }else{
        return this;
    }
}

globalThis.cronTab = function(action, tim){
    var times = 3000;
    if(tim != undefined){
        if(typeof tim == 'number'){
            times = tim;
        }
    }
    var newIdCron = Date.now();
    globalThis.cronIdSetUpNewSession = newIdCron;
    setInterval(function(){
        if(newIdCron == globalThis.cronIdSetUpNewSession){
            if(action != undefined){
                action()
            }
        }
    },times)
}