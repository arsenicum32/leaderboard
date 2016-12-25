var MicroCode = (function(){
	return {
		init: function(inputSel, outputSel, languageSel){
			this.focusInput(inputSel);
			this.listenForInput(inputSel);
			this.listenForLanguage(languageSel, '.code-output', inputSel);
			this.renderOutput(outputSel, $(inputSel)[0].value);
			this.listenerForScroll(inputSel, outputSel);
		},

		listenForInput: function(inputSel){
			var self = this;

			$(inputSel).on('input keydown', function(key){
				var input = this,
					selStartPos = input.selectionStart,
					inputVal = input.value;

				if(key.keyCode === 9){
					input.value = inputVal.substring(0, selStartPos) + "    " + inputVal.substring(selStartPos, input.value.length);
					input.selectionStart = selStartPos + 4;
					input.selectionEnd = selStartPos + 4;
					key.preventDefault();
				}

				self.renderOutput('.code-output', this.value);
			});

			Prism.highlightAll();
		},

		listenForLanguage: function(languageSel, outputSel, inputSel){
			var self = this;
			$(languageSel).on('change', function(){
				$('code', outputSel)
					.removeClass()
					.addClass('language-' + this.value)
					.removeAttr('data-language');

				$(outputSel)
					.removeClass()
					.addClass('code-output language-' + this.value);

				$(inputSel)
					.val('');

				$('code', outputSel)
					.html('');

				self.focusInput(inputSel);
			});
		},

		listenerForScroll: function(inputSel, outputSel){
			$(inputSel).on('scroll', function(){
				console.log(this.scrollTop);
				$(outputSel)[0].scrollTop = this.scrollTop;
			});
		},

		renderOutput: function(outputSel, value){
			$('code', outputSel)
				.html(value.replace(/&/g, "&amp;").replace(/</g, "&lt;")
				.replace(/>/g, "&gt;") + "\n");

			Prism.highlightAll();
		},

		focusInput: function(inputSel){
			var input = $(inputSel);

			input.focus();

			input[0].selectionStart = input[0].value.length;
			input[0].selectionEnd = input[0].value.length;
		}
	}
})();

MicroCode.init('.code-input', '.code-output', '.language');



function update(d){
	var el = $("#"+d).parent().find('span').html();
	$("#"+d).parent().find('span').html( parseInt(el)+1 );
}

function newb(r){
	$('.random').html('')
	$('.random').append(`
		<div class="window">
			<div class="window-header">
				<div class="autor"> <a href="#">${r.id}</a></div>
			</div>
			<div class="window-body">
				<pre class="out"><code class="language-javascript">${r.message}</code></pre>
			</div>
			<div class="window-footer">
				<button class="t">☝🏿</button><span>0</span>
			</div>
		</div>
	`)
	init()
}
function build(ar){
	$('.leaderboard').html('')
	$('.random').html('')
	for(var i in ar){
		$('.leaderboard').append(`
			<div class="window">
	      <div class="window-header">
	        <div class="autor"> <a href="#">${ar[i].owner}</a></div>
	      </div>
	      <div class="window-body">
	        <pre class="out"><code class="language-javascript">${ar[i].text}</code></pre>
	      </div>
	      <div class="window-footer">
	        <button class="t" id="${ar[i].id}">☝🏿</button><span>${ar[i].likes}</span>
	      </div>
	    </div>
		`)
	}
	var r = ar[Math.floor(Math.random() * ar.length )];
	if(r){
		$('.random').append(`
			<div class="window">
				<div class="window-header">
					<div class="autor"> <a href="#">${r.owner}</a></div>
				</div>
				<div class="window-body">
					<pre class="out"><code class="language-javascript">${r.text}</code></pre>
				</div>
				<div class="window-footer">
					<button class="t" id="${r.id}">☝🏿</button><span>${r.likes}</span>
				</div>
			</div>
		`)
	}
	init()
}
function init(){
	$('button').on('click',function(e){
	 e.preventDefault();
	 ! userToken ? lock.show():
	 console.log("click!!");
	 if(userToken){
		 if($(this).attr('id')=='sender'){
			 Sadd( $('.code-input').val(), userToken )
			 $(this).attr('disabled','disabled')
		 }else{
			 Slike( userToken , $(this).attr('id') )
			 var i = $(this).closest( 'span' ).html();
			 console.log(i);
			 i++;
			 $(this).closest( 'span' ).html(i);
		 }
	 }
	});
}
