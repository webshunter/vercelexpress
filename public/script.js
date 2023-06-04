    var script = document.createElement('script');
    script.onload = function () {

        const cssLoader = function () {
            var lod =
                div()
                    .css({
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100vw',
                        height: '100vh',
                        zIndex: '9999999',
                        background: 'rgba(125,125,125,0.4)'
                    })
                    .child(
                        el('style').html(`
        .lds-spinner {
          color: official;
          display: inline-block;
          position: relative;
          width: 80px;
          height: 80px;
        }
        .lds-spinner div {
          transform-origin: 40px 40px;
          animation: lds-spinner 1.2s linear infinite;
        }
        .lds-spinner div:after {
          content: " ";
          display: block;
          position: absolute;
          top: 3px;
          left: 37px;
          width: 6px;
          height: 18px;
          border-radius: 20%;
          background: #fff;
        }
        .lds-spinner div:nth-child(1) {
          transform: rotate(0deg);
          animation-delay: -1.1s;
        }
        .lds-spinner div:nth-child(2) {
          transform: rotate(30deg);
          animation-delay: -1s;
        }
        .lds-spinner div:nth-child(3) {
          transform: rotate(60deg);
          animation-delay: -0.9s;
        }
        .lds-spinner div:nth-child(4) {
          transform: rotate(90deg);
          animation-delay: -0.8s;
        }
        .lds-spinner div:nth-child(5) {
          transform: rotate(120deg);
          animation-delay: -0.7s;
        }
        .lds-spinner div:nth-child(6) {
          transform: rotate(150deg);
          animation-delay: -0.6s;
        }
        .lds-spinner div:nth-child(7) {
          transform: rotate(180deg);
          animation-delay: -0.5s;
        }
        .lds-spinner div:nth-child(8) {
          transform: rotate(210deg);
          animation-delay: -0.4s;
        }
        .lds-spinner div:nth-child(9) {
          transform: rotate(240deg);
          animation-delay: -0.3s;
        }
        .lds-spinner div:nth-child(10) {
          transform: rotate(270deg);
          animation-delay: -0.2s;
        }
        .lds-spinner div:nth-child(11) {
          transform: rotate(300deg);
          animation-delay: -0.1s;
        }
        .lds-spinner div:nth-child(12) {
          transform: rotate(330deg);
          animation-delay: 0s;
        }
        @keyframes  lds-spinner {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `)
    )
    .child(
      div().class('lds-spinner')
      .html(`<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>`)
    )
    .get()
  document.body.appendChild(lod)

  return lod;

}


    //alert(div)
    var body = document.body;
    body.appendChild(
        el('button').class('btn btn-primary').css({
            width: '50px',
            height: '50px',
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            zIndex: '8887',
        }).child(
            el('i').class('fas fa-home')
        ).click(function(){
            globalThis['homebutton'].parent.style.display = 'block';
        }).get()
    );

    body.appendChild(
         div().id('homebutton').css({
           zIndex: "8888",
           position: "fixed",
           display: "none",
           top: 0,
           left:0,
           width: "100vw",
           height: "100vh",
           background: "#fff",
           display: "flex",
           alignItems: "center",
           justifyContent: "center"
         })
        
         .child(
            div()
             .child(
               el("input").id("pid").class("form-control mb-3").hold("pid...")
            )
            .child(
               el("button").class("w-100 btn btn-primary").text("Get Data")
               .click(function(){
                     var val = globalThis["pid"].parent.value;
                     if(val.indexOf('http') != -1){
                        val = val.split('/')[val.split('/').length -1];
                     };
                     var ld = cssLoader();
                     $.ajax({
                        url: baseUrl+"/products/"+val,
                        type: "POST",
                        success: function(data){
                            
                            var tlink = 'https://plantszone.id/?cek-excel='+encodeURI(JSON.stringify(data.data));
                            
                            tlink = tlink.replace(/\#/g,"-");
                            
                            var xw = document.createElement('script');
                            xw.onload = function(){
                                xw.remove();
                                ld.remove();
                            }
                            xw.src = tlink;
                            document.head.appendChild(xw);
                        }
                     })
               })
            )
            .child(
                el("button").class("mt-2 w-100 btn btn-primary").text("Hapus Data")
                .click(function(){
                    var val = globalThis["pid"].parent.value;
                     if(val.indexOf('http') != -1){
                        val = val.split('/')[val.split('/').length -1];
                     };
                     if(val === ''){
                     alert('pid tidak boleh kosong');
                     throw 'tidak boleh kosong';
                     }
                    var tlink = 'http://103.152.118.236:5000/delete/data/'+val;
                    var xw = document.createElement('script');
                    var ld = cssLoader();
                    xw.onload = function(){
                        xw.remove();
                        ld.remove();
                    }
                    xw.src = tlink;
                    document.head.appendChild(xw);
                })
            )
            .child(
                el("button").class("mt-2 w-100 btn btn-primary").text("Update Data")
                .click(function(){
                    var tlink = 'https://plantszone.vercel.app/update/data';
                    var xw = document.createElement('script');
                    var ld = cssLoader();
                    xw.onload = function(){
                        xw.remove();
                        ld.remove();
                    }
                    xw.src = tlink;
                    document.head.appendChild(xw);
                })
            )
            .child(
                div().id('total').css({textAlign: 'center'}).load(function(){
                    (function lid(){
                        var xw = document.createElement('script');
                        xw.onload = function(){
                            xw.remove();
                            setTimeout(function(){
                                lid();
                            },2000)
                        }
                        xw.src = 'https://plantszone.id/?countproduk';
                        document.head.appendChild(xw);
                    })();
                })
            )
         )
         .get()
    )
};
script.src = "https://plantszone.id/assethome/iw-pos.js";

document.head.appendChild(script);