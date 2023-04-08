
  const color = {
    lightGrey : "#fefefe",
    darkGrey : "#596267",
    darkisGrey : "#292b2c",
    black : "#000",
  }
  
  class Root extends RouteMap {
    #data = [];
    #dataPath = [];
    
    #app = null;

    #green = "#658354";
    
    #appTitle = "PlantZone";
    
    #tabsStyle = {
      position: "fixed",
      height: "50px",
      maxHeight: "50px",
      overflow: "hidden",
      background: "#ffffff",
      width: "100%",
      top: "0px",
      left: "0px",
      borderBottom: "1px solid #dddddd",
      boxShadow: "0px 0px 2px #777777",
      zIndex: "99",
    }
    
    #shadow = {
      boxShadow: "0px 0px 2px #777777",
    }
    
    #flexCenterAlign = {
      display: "flex",
      alignItems: "center",
    }
    
    #gridColumnStyle = {
      display: "grid",
      width: "100%",
    }
    
    #searchStyle = {
      width: "calc(100% - 24px)",
      maxWidth: "420px",
      padding: "6px 12px",
      outline: "none",
      border: "1px solid #dddddd",
      borderRadius: "12px",
    }
    
    #insethadowLine = {
      boxShadow: "inset 0px 0px 2px #dddddd",
      display: 'inline-block',
      width: '180px',
      marginRight: '15px',
    }
    
    #searchContainerStyle = {
      padding: "0 10px",
    }

    #searchDataGenerate(){
      var nm = (function(){
        sc = 'anthurium';
        var g = window.RouteAction.#data.data;
        g = g.filter(function(c){
          if(c.product_name.toLowerCase().indexOf('anthurium') != -1){
            return c;
          }
        })
        console.log(g)
      })();
      return nm;
    }
    
    #searchWidget(){
      var ty = window.RouteAction;
      var n = div()
      .css('display', 'grid')
      .css('grid-template-columns', 'auto')
      .child(
        div()
        .css({
          display: 'grid',
          width: '100%',
          gridTemplateColumns: 'auto auto',
        })
        .child(
          div().css({
            display: 'flex',
            alignItems: 'center',
          }).child(
            el('h3').text("PLANTZONE")
          )
        )
        .child(
          div()
          .align('right')
          .css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end'
          })
          .child(
            el("input")
            .hold("search...").css(window.RouteAction.#searchStyle)
            .css(window.RouteAction.#insethadowLine)
            .addModule('ty',ty)
            .keyup(function(){
              window.RouteAction.#numDataLoad = 0;
              var data = window.RouteAction.#data;
              data = data.data;
              var val = this.value;
              data = data.filter(function(c){
                if(c.product_name.toLowerCase().indexOf(val.toLowerCase()) != -1){
                  return c;
                }
              })
              window.RouteAction.#dataPath = window.RouteAction.#bagiData(data)
              console.log(window.RouteAction.#dataPath)
              window.RouteAction.#activeCol.forEach(function(r){
                r.get().innerHTML = '';
              });
              window.RouteAction.#loadContent();
            })
            .val(window.RouteAction.#searchData)
          )
        )
      )
      return div().css(window.RouteAction.#gridColumnStyle).child(n);
    }
    
    #tabBarMenus(){
      
    }
    
    #loadTab(){
      var tabs = div()
      .display("block")
      .css(window.RouteAction.#tabsStyle)
      .child(
        div().css(window.RouteAction.#flexCenterAlign)
        .css('position', 'relative')
        .css('justify-content', 'center')
        .child(
          el('i').class('fas fa-search').css({
            position: 'absolute',
            left: '10px',
          })
        )
        .child(
         h1()
         .padding("0 10px")
         .size("16px")
         .child(
          el('i').class("fa-solid fa-seedling")
          .color('green')
          .css('margin-right', '5px')
         )
         .child(
          el('span').class('pacifico').size('18px').text(window.RouteAction.#appTitle)
         )
        )
        .child(
          div().css('clear', 'both')
        )
       )
      .child(
         div()
         .css({
          position: 'absolute',
          top: '0',
          height: '50px',
          width: '100%',
          background: color.lightGrey,
         })
         .css(window.RouteAction.#flexCenterAlign)
         .css(window.RouteAction.#searchContainerStyle)
         .child(window.RouteAction.#searchWidget())
       )
       window.RouteAction.#app.appendChild(
       tabs.get()
      )
    }
    
    #columsContainer(nums = 2){
      var total = 100;
      var path = total / nums;
      var temps = [];
      var content = [];
      for(
        var x = 0;
        x < nums;
        x++
      )
      {
        temps.push(path+"%")
        content.push(div())
      }

      /*
        gap : 10;
        2 kolom

        gap : 30
        4kolom
      */

      var gap = (nums - 1) * 10;

      var grid = div()
      grid.width("calc(100% - "+gap+"px)")
      grid.display("grid")
      grid.css("margin-top", "10px")
      grid.css("grid-gap", "10px")
      grid.css("grid-template-columns", temps.join(" "));
      content.forEach(function(c){
        grid.child(
          c
        )
      })
      this.#app.appendChild(
        grid.get()
      )
      // console.log(content)
      return {
        content: content,
        grid: grid
      }
    }
    
    #cardImage={
      height: "100%",
      minHeight:"150px",
      margin:"0",
      padding:"0",
      borderRadius:"8px",
      //paddingBottom: "-5px",
      background: "#4b6043"
    }
    
    #cardClick(event){
      event.stopPropagation()
      var h = event.target.h
      var d = event.target.d
      var all = h.#data;
      console.log(d)
      h.#openDetail(d, h)
    }
    
    #card(d){
      var screen = d.product_media;
      var img = screen[0].image;
      var name = d.product_name
      var n = div()
      //console.log(d)
      n.cursor('pointer')
      n.position('relative')
      n.css("padding","10px")
      n.css("background","white")
      n.css("margin-bottom","10px")
      n.css("border-radius","4px")
      n.css("box-shadow","0 0 2px rgba(105,105,105,0.5)")
      
      n.child(
        div()
        .css(window.RouteAction.#cardImage)
        .html(
          "<img alt='"+name+"' style='display:inline-block;overflow:hidden;border-radius:8px;margin:0;padding:0;' width='100%'src='"+img+"'></img>"
        )
      )
      n.child(
        el("h3")
          .css('font-weight','500')
          .margin("0")
          .css('margin-top','5px')
          .css('margin-bottom','5px')
          .size("12px")
          .child(
            el('i')
            .class("fas fa-leaf").color(window.RouteAction.#green)
            .css('margin-right', '2px')
          )
          .child(
            el('span')
            .text(name)
          )
      )
      n.child(
        el('p').color("#658354").size('14px').margin('0')
        .child(
          el('span').text("$")
        )
        .child(
          el('span').text(d.price.number(2).currency(2))
        )
      )
      .child(
        div()
        .css({
          position: 'absolute',
          top: '0',
          left: '0',
          background: 'transparent',
          width: '100%',
          height: '100%',
        })
        .addModule('d', d)
        .addModule('h', window.RouteAction)
        .click(window.RouteAction.#cardClick)
      )
      return n;
    }
    
    #numDataLoad = 0;
    
    #loadDataCard(columns){
      var data = window.RouteAction.#dataPath[window.RouteAction.#numDataLoad];
      if(data != undefined){
        var e = 0;
        var col = columns.length;
        var obj = window.RouteAction;
        data.forEach(function(d){
          var cols = null;
          if(e == (col - 1) ){
            cols = columns[e];
            e = -1;
          }else{
            cols = columns[e]
          }
          console.log(cols.get())
          cols.get().appendChild(
            div().child(obj.#card(d)).get()
          )
          e++;
        })
        window.RouteAction.#numDataLoad++;
      }
      return this;
    }

    loadDataCard(){
      window.RouteAction.#loadDataCard(window.RouteAction.#activeCol);
    }

    #activeCol = null;
    
    #loadContent(){
      // 2 columns default
      var col = 2;

      if(window.innerWidth > 1024){
        col = 4;
      }
      
      if(window.innerWidth <= 1024 && window.innerWidth >= 800){
        col = 3;
      }

      var app = this.#app;
      var columns = window.RouteAction.#columsContainer(col).content;
      console.log(columns)
      window.RouteAction.#activeCol = columns;
      window.RouteAction.#loadDataCard(columns)
    }
    
    #bagiData(data, nums=12){
      var newPath = [];
      var bagi = [];
      var t = 1;
      data.forEach(function(r,i){
        if(i == (data.length - 1) || t == nums )
        {
          t++;
          bagi.push(r)
          newPath.push(bagi)
          bagi = []
          t = 1;
        }else{
          t++;
          bagi.push(r)
        }
      })
      return newPath;
    }

    #tabBottom(){
      var app = window.RouteAction.#app;
      var n = div()
      .css({
        position: 'fixed',
        height: '50px',
        width: '100%',
        bottom: '0',
        right: '0',
        background: 'white',
        borderTopRightRadius: '8px',
        borderTopLeftRadius: '8px',
        zIndex: '99',
      }).css(window.RouteAction.#shadow)
      .css(window.RouteAction.#flexCenterAlign)
      .css('justify-content', 'center')
      .child(
        div()
        .click(function(event){
          event.stopPropagation();
          location.href = 'https://api.whatsapp.com/send?phone=6285804588688&text=Hallo%20i%27am%20interest%20to%20order%20some%20kind%20of%20plants.';
        })
        .css({
          borderRadius: "10px",
          padding: "8px 15px",
          margin: "0px 10px",
          minWidth: "120px",
          background: window.RouteAction.#green,
          textAlign: "center",
          color: "white",
          border: "1px dotted green",
        })
        .child(
          el('i').class('fas fa-message').css('margin-right', '8px')
        )
        .child(
          el('span').text('Order Now')
        )
      )

      app.appendChild(n.get())

    }

    #cekActioScroll = 0;

    cekScrol(){
      return this.#cekActioScroll;
    }

    cekLastLoad(){
      var t = window.RouteAction.#numDataLoad;
      var y = window.RouteAction.#dataPath.length - 1;
      var s = true;
      if(t > y){
        s = false;
      }
      return s;
    }
    
    #bodyScrollEvent(event){
      var obj = window.RouteAction;
      if (
        window.scrollY + window.innerHeight 
          >= 
        document.body.scrollHeight
      ) {
        // do something when user has scrolled to the end
        var tClick = globalThis['actionHiden'].parent;

        if(obj.cekScrol() === 0){
          if(obj.cekLastLoad() === true){
            tClick.click()
          }
        }
      }
    }

    #scrollLast = 0;

    finishScrolAct(){
      var last = window.RouteAction.#scrollLast;
      globalThis['loaderDoc'].parent.style.display = 'none';
      window.RouteAction.#cekActioScroll = 0;
    }
    
    startScrolAct(){
      window.RouteAction.#scrollLast = (document.body.scrollHeight - 5)
      globalThis['loaderDoc'].parent.style.display = 'block';
      setTimeout(function(){
        window.scrollTo(0, document.body.scrollHeight);
      });
      window.RouteAction.#cekActioScroll = 1;
    }


    #hiddenClick(event){
      var obj = window.RouteAction;
      obj.startScrolAct()
      setTimeout(function(){
        obj.finishScrolAct();
        obj.loadDataCard();
      },1000)
      console.log("area")
    }

    #isMobile(){
      var r = false;
      if(window.innerWidth < 500){
        r = true;
      }
      return r;
    }

    #elementDetail = null;
    #elementDetailBody = null;

    #dataDetail(data){
      var d = div().class('detail').css({
        display: 'block',
        position: 'relative',
        height: '100%',
        width: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        overflowY: 'auto',
      })
      .child(
        div().css('background', '#ddd').child(
          div().css({
            width: 'calc(100% - 100px)',
            maxWidth: 'calc(100% - 100px)',
            margin: '0 45px'
          }).load(function(t){
            var e = t.el;
            var h = e.clientWidth + 20;
            e.appendChild(
              div().css({
                display: 'flex',
                justifyContent: 'center',
              }).child(
                div().css('display', 'block').width(h+'px').child(
                  el('div').id('slider'+Date.now()).html(`
                    ${data.product_media.map(function(t){
                      return `<div>
                        <img width='100%' src="${t.image}" />
                      </div>`;
                    }).join('')}
                  `).load(function(r){
                    var id = r.el.id;
                    $('#'+id).slick();
                  })
                )
              )
              .get()
            )
          })
        )
      )
      .child(
        div().css({
          padding: '4px 8px',
          fontSize: '16px',
          fontWeight: 'bold',
        })
        .text(data.product_name)
      )
      .child(
        div().css({
          padding: '4px 8px',
          fontSize: '14px',
        })
        .text('S$'+data.price)
      )
      .child(
        div().css({
          padding: '4px 8px',
          fontSize: '14px',
        })
        .child(
          el('button').css({
            borderRadius: "10px",
            padding: "4px 8px",
            background: window.RouteAction.#green,
            textAlign: "center",
            color: "white",
            border: "1px dotted green",
          }).text(`i\'m interest`).click(function(){
            location.href = 'https://api.whatsapp.com/send?phone=6285804588688&text=Hallo%20i%27am%20interest%20to%20order%20some%20kind%20of%20plants.';
            // order now
          })
        )
      )
      .child(
        div().css({
          padding: '12px 8px',
          paddingRight: '14px',
          fontSize: '14px',
        })
        .text(data.description)
      )
      ;
      return d.get();
    }

    #openDetail(d){
      var body = window.RouteAction.#elementDetailBody;
      window.RouteAction.#elementDetail.style.display = 'grid';
      body.innerHTML = '';
      body.style.background = '#fff';
      body.appendChild(
        window.RouteAction.#dataDetail(d)
      )
    }

    #detail(){
      var obj = window.RouteAction;
      var h = div().position('fixed')
      obj.#elementDetail = h.get();
      var head = div().display('flex')
      .css(obj.#flexCenterAlign)
      .css(obj.#shadow)
      .child(
        el('i').class('fas fa-times')
        .padding('0 10px')
        .size('18px')
        .cursor('pointer')
        .css('font-weight', '600')
        .addModule('h', h.get())
        .click(function(){
          this.h.style.display = 'none'
        })
      )

      if(obj.#isMobile() === true){
        head = div().display('flex')
          .css(obj.#flexCenterAlign)
          .css(obj.#shadow)
          .child(
            el('span').text('close')
          )
          .css('justify-content', 'center')
          .addModule('h', h.get())
          .click(function(){
            this.h.style.display = 'none'
          })
      }

      var body = div().background("#cedae6")

      obj.#elementDetailBody = body.get();
      
        h.bottom(0)
        h.left(0)
        h.height("100vh")
        h.width("100vw")
        h.display("none")
        h.background("white")
        h.css("z-index", "999")
        h.css("overflow-x", "hidden")
        h.css("overflow-y", "auto")
        if(obj.#isMobile() === true){
          h.css("grid-template-rows", "auto 50px")
          h.child(body)
          h.child(head)
        }else{
          h.css("grid-template-rows", "50px auto")
          h.child(head)
          h.child(body)
        }

        document.body.appendChild(h.get())
    }

    #searchData = '';

    start(data, id, search=''){
      this.#searchData = search;
      document.body.appendChild(
        div()
          .id("loaderDoc")
          .display('none')
          .align('center')
          .html('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>')
          .get()
      )
      window.RouteAction = this;
      document.body.onscroll = this.#bodyScrollEvent
      document.body.appendChild(
        el('span')
          .addModule('obj', this)
          .id('actionHiden')
          .click(delay(this.#hiddenClick,500)).get()
      )
      document.body.style.background = "#cedae6"
      document.body.style.paddingTop = "50px"
      document.body.style.paddingBottom = "50px"
      window.RouteAction.#data = data;
      window.RouteAction.#dataPath = window.RouteAction.#bagiData(data.data)
      window.RouteAction.#app = document.getElementById(id);
      el(window.RouteAction.#app)
      .css("width","100%")
      //.background("#ddd")
      window.RouteAction.#loadTab()
      window.RouteAction.#tabBottom()
      window.RouteAction.#loadContent()
      window.RouteAction.#detail()
    }
    
  }
  var home = new Root()
  home.start(JSON.parse( decodeEntities( document.getElementById('data').innerHTML ) ), "app");