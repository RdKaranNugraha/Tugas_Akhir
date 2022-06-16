
	$(document).ready(function() {
		$.ajax({
			type: "POST",
			url: "/getAcce",
			data: {},
			success: function(responseData) {
				var dataJson = JSON.parse(responseData.replace(/\&#34;/g, '"'));
				var t = $('#acce').DataTable({
					data: dataJson.data,
					columns: [
						{ title: "Time Stamp", "className": "text-center" },
						{ title: "Elapsed", "className": "text-center" },
						{ title: "Sub ID &amp; Grade ID", "className": "text-center" },
						{ title: "actid", "className": "text-center" }
					],
					'pageLength':18,
					searching: false,
					dom: 'Bfrtip',
					buttons: [
						{
							text: 'Accelerometer',
							action: function ( e, dt, node, config ) {
								$('div.loadingtabel,.loaddata').css({'display':'flex'});
								$.ajax({
									type: "POST",
									url: "/getAcce",
									data: {},
									success: function(responseData) {
										var dataJson = JSON.parse(responseData.replace(/\&#34;/g, '"'));
										dt.clear();
										dt.rows.add(dataJson.data);
										dt.draw();
										$('div.loadingtabel').css({'display':'none'});
									},
									error: function(jqXHR, textStatus, errorThrown) {
										console.log(errorThrown);
									}
								});
								warna = '#'+Math.floor(Math.random()*16777215).toString(16);
								$.ajax({
									type: "POST",
									url: "/getGrafik",
									data: {dataGrafik:'Accelerometer.csv',dataGrafik1:'',dataGrafik2:'',warna3:'',warna4:'',warna5:'',warna6:'',warna7:'',warna8:'',satuan1:'',satuan2:'',warna:'r',warna1:'g',warna2:'b',jenis:'exyz',satuan:' (g)'},
									success: function(responseData) {
										$('.grafik img, .modal img').attr('src','./'+responseData+'?v='+Math.random() * (100 - 1) + 1);
										$('.loaddata').css({'display':'none'});
									},
									error: function(jqXHR, textStatus, errorThrown) {
										$('.loaddata').css({'display':'none'});
									}
								});
							}
						},
						{
							text: 'Gyroscope',
							action: function ( e, dt, node, config ) {
								$('div.loadingtabel,.loaddata').css({'display':'flex'});
								$.ajax({
									type: "POST",
									url: "/getGyro",
									data: {},
									success: function(responseData) {
										var dataJson = JSON.parse(responseData.replace(/\&#34;/g, '"'));
										dt.clear();
										dt.rows.add(dataJson.data);
										dt.draw();
										$('div.loadingtabel').css({'display':'none'});
									},
									error: function(jqXHR, textStatus, errorThrown) {
										console.log(errorThrown);
									}
								});
								warna = '#'+Math.floor(Math.random()*16777215).toString(16);
								$.ajax({
									type: "POST",
									url: "/getGrafik",
									data: {dataGrafik:'Gyroscope.csv',dataGrafik1:'',dataGrafik2:'',warna3:'',warna4:'',warna5:'',warna6:'',warna7:'',warna8:'',satuan1:'',satuan2:'',warna:'r',warna:'r',warna1:'g',warna2:'b',jenis:'exyz',satuan:' (deg/s)'},
									success: function(responseData) {
										$('.grafik img, .modal img').attr('src','./'+responseData+'?v='+Math.random() * (100 - 1) + 1);
										$('.loaddata').css({'display':'none'});
									},
									error: function(jqXHR, textStatus, errorThrown) {
										$('.loaddata').css({'display':'none'});
									}
								});
							}
						},
						{
							text: 'Magnetometer',
							action: function ( e, dt, node, config ) {
								$('div.loadingtabel,.loaddata').css({'display':'flex'});
								$.ajax({
									type: "POST",
									url: "/getMagne",
									data: {},
									success: function(responseData) {
										var dataJson = JSON.parse(responseData.replace(/\&#34;/g, '"'));
										dt.clear();
										dt.rows.add(dataJson.data);
										dt.draw();
										$('div.loadingtabel').css({'display':'none'});
									},
									error: function(jqXHR, textStatus, errorThrown) {
										console.log(errorThrown);
									}
								});
								warna = '#'+Math.floor(Math.random()*16777215).toString(16);
								$.ajax({
									type: "POST",
									url: "/getGrafik",
									data: {dataGrafik:'Magnetometer.csv',dataGrafik1:'',dataGrafik2:'',warna3:'',warna4:'',warna5:'',warna6:'',warna7:'',warna8:'',satuan1:'',satuan2:'',warna:'r',warna:'r',warna1:'g',warna2:'b',jenis:'exyz',satuan:' (T)'},
									success: function(responseData) {
										$('.grafik img, .modal img').attr('src','./'+responseData+'?v='+Math.random() * (100 - 1) + 1);
										$('.loaddata').css({'display':'none'});
									},
									error: function(jqXHR, textStatus, errorThrown) {
										$('.loaddata').css({'display':'none'});
									}
								});
							}
						}
					],
					"initComplete": function(settings, json) {
					}
				});
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(errorThrown);
			}
		});
		
		$('.tutup').on('click',function(){
			$('.tambah').css({'display':'none'});
		});
		
		$('.menuhome').on('click',function(){
			window.location.reload();
		});
		$(document).on('change','.fileup',function(){
			$('.loaddata').css({'display':'flex'});
			var fd = new FormData();
			var files = $(this)[0].files;
			
			// Check file selected or not
			if(files.length > 0 ){
			   fd.append('file',files[0]);
			}
			$.ajax({
				type: "POST",
				url: "/uploadFile",
				data:fd,
				contentType: false,
				processData: false,
				success: function(responseData) {
					Swal.fire({
					  title: '<div style="font-size:18px;">Apakah anda akan melakukan Proses Prediksi atau Ingin Upload Data Lain?</div>',
					  showDenyButton: true,
					  showCancelButton: false,
					  denyButtonText: '<div style="font-size:14px;">Lanjutkan Prediksi <i class="fa fa-arrow-right"></i></div>',
					  confirmButtonText: '<div style="font-size:14px;"><i class="fa fa-cloud-upload"></i> Upload Data</div>',
					  customClass: {
						actions: 'my-actions',
						confirmButton: 'order-1',
						denyButton: 'order-2',
					  }
					}).then((result) => {
					  if (result.isConfirmed) {
					  } else if (result.isDenied) {
							var t = '', dataJson='', judulT = new Array('','Data Accelerometer yang Akan Diproses','Data Gyroscope yang Akan Diproses','Data Magnetometer yang Akan Diproses',
								'Data Training Accelerometer', 'Data Training Gyroscope', 'Data Training Magnetometer',
								'Data Testing Accelerometer', 'Data Testing Gyroscope', 'Data Testing Magnetometer'
							),
							deskT = new Array('','Data Accelerometer untuk Proses Prediksi Tahapan dalam Pengelasan','Data Gyroscope untuk Proses Prediksi Tahapan dalam Pengelasan','Data Magnetometer untuk Proses Prediksi Tahapan dalam Pengelasan',
								'1200 Data Training Accelerometer','1200 Data Training Gyroscope','1200 Data Training Magnetometer',
								'800 Data Testing Accelerometer','800 Data Testing Gyroscope','800 Data Testing Magnetometer'
							);
							$('.loaddata').css({'display':'flex'});
							lakukanPrediksi(1);
							function lakukanPrediksi(tahap){
								$.ajax({
									type: "POST",
									url: "/getPrediksi",
									data: {tahap:tahap},
									error: function(){
										$('.loaddata').css({'display':'none'});
										Swal.fire(
										  'Terjadi Kesalahan',
										  'Terjadi Kesalahan saat memproses data',
										  'danger'
										);
										setTimeout(function(){
											//window.location.reload();
										},1000);
									},
									success: function(responseData) {
										if(responseData.indexOf('selesai') >= 0){
											var hasilPrediksi = responseData.split('-');
											$('.isiproses').append('<h3 class="judultabel text-center">Hasil Prediksi dari Data Testing</h3><div class="hasilprediksi"><ol><li>'+hasilPrediksi[1]+'</li><li>'+hasilPrediksi[2]+'</li><li>'+hasilPrediksi[3]+'</li><li>'+hasilPrediksi[4]+'</li></ol></div><h3 class="judultabel text-center">Grafik Hasil Prediksi</h3></div><div class="grafiktahap"><img src = "./static/grafik/tahap/t'+tahap+'.png?v='+(Math.random() * (100 - 1) + 1)+'" /></div><br /><br />');
											$('.loaddata').css({'display':'none'});
											Swal.fire(
											  'Proses Selesai',
											  'Berhasil melakukan Prediksi Tahapan dalam Pengelasan',
											  'success'
											);
										}else{
											if(tahap <= 1){
												$('.isiproses').html('<div class="box-header"><h3 class="judultabel">('+tahap+') '+judulT[tahap]+'</h3><small class="desktabel">'+deskT[tahap]+'</small></div><table id = "proseslstm'+tahap+'"></table><br /><br /><div class="box-header"><h3 class="judultabel">Grafik '+judulT[tahap]+'</h3><small class="desktabel">Gambar Grafik '+deskT[tahap]+'</small></div><div class="grafiktahap"><img src = "./static/grafik/tahap/t'+tahap+'.png?v='+(Math.random() * (100 - 1) + 1)+'" /></div><br /><br />');
											}else{
												$('.isiproses').append('<div class="box-header"><h3 class="judultabel">('+tahap+') '+judulT[tahap]+'</h3><small class="desktabel">'+deskT[tahap]+'</small></div><table id = "proseslstm'+tahap+'"></table><br /><br /><div class="box-header"><h3 class="judultabel">Grafik '+judulT[tahap]+'</h3><small class="desktabel">Gambar Grafik '+deskT[tahap]+'</small></div><div class="grafiktahap"><img src = "./static/grafik/tahap/t'+tahap+'.png?v='+(Math.random() * (100 - 1) + 1)+'" /></div><br /><br />');
											}
											dataJson = JSON.parse(responseData.replace(/\&#34;/g, '"'));
											t = $('#proseslstm'+tahap).DataTable({
												data: dataJson.data,
												columns: [
													{ title: "x-axis (g)", "className": "text-center"},
													{ title: "y-axis (g)", "className": "text-center" },
													{ title: "z-axis (g)", "className": "text-center" },
													{ title: "Tahapan Pengelasan", "className": "text-center" }
												],
												'pageLength':25,
												searching: false,
												buttons:[],
												dom: 'Bfrtip',
												"initComplete": function(settings, json) {
													$('html, body').animate({ scrollTop: $(document).height()-$(window).height() });
													setTimeout(function(){
														lakukanPrediksi(tahap+1);
													},1000);
												}
											});
										}
									}
								});
							}
					  }
					});
					$('.fileup').val('');
					$('.loaddata').css({'display':'none'});
				}
			});
		});
		$('.prediksi').on('click',function(){
			var url = $(this).attr('data-url');
			var tahap = $(this).attr('data-id');
			$('.tahapproses').css({'display':'block'});
			$('.nontahap').css({'display':'none'});
			$('.loaddata').css({'display':'flex'});
			$('.isiproses').html('<div class="box-header"><h3 class="judultabel">Upload Data yang akan diproses Untuk Prediksi</h3><small class="desktabel">Upload data CSV Accelerometer, Gyroscope dan Magnetometer pada form dibawah ini</small></div><form class="form"><div class="file-upload-wrapper" data-text="Select your file!">  <input name="file-upload-field" type="file" class="file-upload-field fileup"  accept=".csv" />  <div class="uploadskrg"><i class="fa fa-cloud-upload"></i><br />Pilih File Disini</div></div></form><table id = "proseslstm"></table>');
			setTimeout(function(){
				$('.loaddata').css({'display':'none'});
			},500);
		});
		
		$.ajax({
			type: "POST",
			url: "/totalData",
			data: {},
			success: function(responseData) {
				$('div.loadingtabel').css({'display':'none'});
				$('.loaddata').css({'display':'none'});
				var total = responseData.split(' ');
				$('.totaluser').html(total[0]);
				$('.totaldata').html(total[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
			},
			error: function(jqXHR, textStatus, errorThrown) {
			}
		});
		
		$.ajax({
			type: "POST",
			url: "/getUsers",
			data: {},
			success: function(responseData) {
				var dataJson = JSON.parse(responseData.replace(/\&#34;/g, '"'));
				var t = $('#daftarusers').DataTable({
					data: dataJson.data,
					columns: [
						{ title: "Nama" },
						{ title: "Username", "className": "text-center" },
						{ title: "Password", "className": "text-center" },
						{ title: "Jenis Akun", "className": "text-center" }
					],
					'pageLength':14,
					searching: false,
					dom: 'Bfrtip',
					buttons: [
					],
					"initComplete": function(settings, json) {
						var tData = $('#daftarusers tbody tr').length, i;
						for(i=0;i<tData;i++){
							$('#daftarusers tbody tr:eq('+i+') td:eq(2)').html('******************');
						}
					}
				});
			},
			error: function(jqXHR, textStatus, errorThrown) {
			}
		});
		
		$('.users').on('click',function(){
			$('.tahapproses').css({'display':'block'});
			$('.nontahap').css({'display':'none'});
			$('.loaddata').css({'display':'flex'});
			$('.isiproses').html('<div class="box-header"><h3 class="judultabel">Daftar Pengguna Aplikasi</h3><small class="desktabel">Berikut ini adalah Daftar Pengguna Aplikasi</small></div><table id = "daftarusers"></table>');
			
			$.ajax({
				type: "POST",
				url: "/getUsers",
				data: {},
				success: function(responseData) {
					var dataJson = JSON.parse(responseData.replace(/\&#34;/g, '"'));
					var t = $('#daftarusers').DataTable({
						data: dataJson.data,
						columns: [
							{ title: "Nama" },
							{ title: "Username", "className": "text-center" },
							{ title: "Password", "className": "text-center" },
							{ title: "Jenis Akun", "className": "text-center" }
						],
						'pageLength':14,
						searching: false,
						dom: 'Bfrtip',
						buttons: [
						],
						"initComplete": function(settings, json) {
							var tData = $('#daftarusers tbody tr').length, i;
							for(i=0;i<tData;i++){
								$('#daftarusers tbody tr:eq('+i+') td:eq(2)').html('******************');
							}
							$('div.loadingtabel').css({'display':'none'});
							$('.loaddata').css({'display':'none'});
						}
					});
				},
				error: function(jqXHR, textStatus, errorThrown) {
				}
			});
		});
		$('.menugrafik').on('click',function(){
			$('.tahapproses').css({'display':'none'});
			$('.nontahap').css({'display':'block'});
			var url = $(this).attr('data-url');
			var fileCsv = $(this).attr('data-id');
			var fileCsv1 = $(this).attr('data-id1');
			var fileCsv2 = $(this).attr('data-id2');
			var satuan = $(this).attr('data-satuan');
			var satuan1 = $(this).attr('data-satuan1');
			var satuan2 = $(this).attr('data-satuan2');
			
			$('.loaddata').css({'display':'flex'});
			$('.isi').html('<table id = "acce"></table>');
			$.ajax({
				type: "POST",
				url: "/"+url,
				data: {},
				success: function(responseData) {
					var dataJson = JSON.parse(responseData.replace(/\&#34;/g, '"'));
					var t = $('#acce').DataTable({
						data: dataJson.data,
						columns: [
							{ title: "Time Stamp", "className": "text-center" },
							{ title: "Elapsed", "className": "text-center" },
							{ title: "Sub ID &amp; Grade ID", "className": "text-center" },
							{ title: "actid", "className": "text-center" }
						],
						'pageLength':5,
						searching: false,
						dom: 'Bfrtip',
						buttons: [/*
							{
								text: 'E => X',
								action: function ( e, dt, node, config ) {
									$('.loaddata').css({'display':'flex'});
									warna = '#'+Math.floor(Math.random()*16777215).toString(16);
									$.ajax({
										type: "POST",
										url: "/getGrafik",
										data: {dataGrafik:fileCsv+'.csv',warna:warna,jenis:'ex',satuan:satuan},
										success: function(responseData) {
											$('.judulgrafik').html('Grafik Monitoring <b style="color:#000;">'+fileCsv+' Elapased terhadap X-Axis</b>');
											$('.grafik img, .modal img').attr('src','./'+responseData+'?v='+Math.random() * (10000 - 1) + 1);
											$('.loaddata').css({'display':'none'});
										},
										error: function(jqXHR, textStatus, errorThrown) {
											$('.loaddata').css({'display':'none'});
										}
									});
								}
							},
							{
								text: 'E => Y',
								action: function ( e, dt, node, config ) {
									$('.loaddata').css({'display':'flex'});
									warna = '#'+Math.floor(Math.random()*16777215).toString(16);
									$.ajax({
										type: "POST",
										url: "/getGrafik",
										data: {dataGrafik:fileCsv+'.csv',warna:warna,jenis:'ey',satuan:satuan},
										success: function(responseData) {
											$('.judulgrafik').html('Grafik Monitoring <b style="color:#000;">'+fileCsv+' Elapased terhadap Y-Axis</b>');
											$('.grafik img, .modal img').attr('src','./'+responseData+'?v='+Math.random() * (10000 - 1) + 1);
											$('.loaddata').css({'display':'none'});
										},
										error: function(jqXHR, textStatus, errorThrown) {
											$('.loaddata').css({'display':'none'});
										}
									});
								}
							},
							{
								text: 'E => Z',
								action: function ( e, dt, node, config ) {
									$('.loaddata').css({'display':'flex'});
									warna = '#'+Math.floor(Math.random()*16777215).toString(16);
									$.ajax({
										type: "POST",
										url: "/getGrafik",
										data: {dataGrafik:fileCsv+'.csv',warna:warna,jenis:'ez',satuan:satuan},
										success: function(responseData) {
											$('.judulgrafik').html('Grafik Monitoring <b style="color:#000;">'+fileCsv+' Elapased terhadap Z-Axis</b>');
											$('.grafik img, .modal img').attr('src','./'+responseData+'?v='+Math.random() * (10000 - 1) + 1);
											$('.loaddata').css({'display':'none'});
										},
										error: function(jqXHR, textStatus, errorThrown) {
											$('.loaddata').css({'display':'none'});
										}
									});
								}
							},
							{
								text: 'Pre E => Z',
								action: function ( e, dt, node, config ) {
									$('.loaddata').css({'display':'flex'});
									warna = '#'+Math.floor(Math.random()*16777215).toString(16);
									$.ajax({
										type: "POST",
										url: "/getGrafik",
										data: {dataGrafik:fileCsv+'.csv',warna:warna,jenis:'pez',satuan:satuan},
										success: function(responseData) {
											$('.judulgrafik').html('Grafik Monitoring <b style="color:#000;">'+fileCsv+' Preparation Elapased terhadap Z-Axis</b>');
											$('.grafik img, .modal img').attr('src','./'+responseData+'?v='+Math.random() * (10000 - 1) + 1);
											$('.loaddata').css({'display':'none'});
										},
										error: function(jqXHR, textStatus, errorThrown) {
											$('.loaddata').css({'display':'none'});
										}
									});
								}
							},
							{
								text: 'Gri E => Z',
								action: function ( e, dt, node, config ) {
									$('.loaddata').css({'display':'flex'});
									warna = '#'+Math.floor(Math.random()*16777215).toString(16);
									$.ajax({
										type: "POST",
										url: "/getGrafik",
										data: {dataGrafik:fileCsv+'.csv',warna:warna,jenis:'gez',satuan:satuan},
										success: function(responseData) {
											$('.judulgrafik').html('Grafik Monitoring <b style="color:#000;">'+fileCsv+' Grinding Elapased terhadap Z-Axis</b>');
											$('.grafik img, .modal img').attr('src','./'+responseData+'?v='+Math.random() * (10000 - 1) + 1);
											$('.loaddata').css({'display':'none'});
										},
										error: function(jqXHR, textStatus, errorThrown) {
											$('.loaddata').css({'display':'none'});
										}
									});
								}
							},
							{
								text: 'Wel E => Z',
								action: function ( e, dt, node, config ) {
									$('.loaddata').css({'display':'flex'});
									warna = '#'+Math.floor(Math.random()*16777215).toString(16);
									$.ajax({
										type: "POST",
										url: "/getGrafik",
										data: {dataGrafik:fileCsv+'.csv',warna:warna,jenis:'wez',satuan:satuan},
										success: function(responseData) {
											$('.judulgrafik').html('Grafik Monitoring <b style="color:#000;">'+fileCsv+' Welding Elapased terhadap Z-Axis</b>');
											$('.grafik img, .modal img').attr('src','./'+responseData+'?v='+Math.random() * (10000 - 1) + 1);
											$('.loaddata').css({'display':'none'});
										},
										error: function(jqXHR, textStatus, errorThrown) {
											$('.loaddata').css({'display':'none'});
										}
									});
								}
							},
							{
								text: 'SC E => Z',
								action: function ( e, dt, node, config ) {
									$('.loaddata').css({'display':'flex'});
									warna = '#'+Math.floor(Math.random()*16777215).toString(16);
									$.ajax({
										type: "POST",
										url: "/getGrafik",
										data: {dataGrafik:fileCsv+'.csv',warna:warna,jenis:'scez',satuan:satuan},
										success: function(responseData) {
											$('.judulgrafik').html('Grafik Monitoring <b style="color:#000;">'+fileCsv+' Slag Cleaning Elapased terhadap Z-Axis</b>');
											$('.grafik img, .modal img').attr('src','./'+responseData+'?v='+Math.random() * (10000 - 1) + 1);
											$('.loaddata').css({'display':'none'});
										},
										error: function(jqXHR, textStatus, errorThrown) {
											$('.loaddata').css({'display':'none'});
										}
									});
								}
							},
							{
								text: 'O E => Z',
								action: function ( e, dt, node, config ) {
									$('.loaddata').css({'display':'flex'});
									warna = '#'+Math.floor(Math.random()*16777215).toString(16);
									$.ajax({
										type: "POST",
										url: "/getGrafik",
										data: {dataGrafik:fileCsv+'.csv',warna:warna,jenis:'oez',satuan:satuan},
										success: function(responseData) {
											$('.judulgrafik').html('Grafik Monitoring <b style="color:#000;">'+fileCsv+' Others Elapased terhadap Z-Axis</b>');
											$('.grafik img, .modal img').attr('src','./'+responseData+'?v='+Math.random() * (10000 - 1) + 1);
											$('.loaddata').css({'display':'none'});
										},
										error: function(jqXHR, textStatus, errorThrown) {
											$('.loaddata').css({'display':'none'});
										}
									});
								}
							}*/
							{
								text: 'E => XYZ',
								action: function ( e, dt, node, config ) {
									$('.loaddata').css({'display':'flex'});
									warna = '#'+Math.floor(Math.random()*16777215).toString(16);
									$.ajax({
										type: "POST",
										url: "/getGrafik",
										data: {dataGrafik:fileCsv+'.csv',warna:'r',dataGrafik1:'',dataGrafik2:'',warna3:'',warna4:'',warna5:'',warna6:'',warna7:'',warna8:'',satuan1:'',satuan2:'',warna:'r',warna1:'g',warna2:'b',jenis:'exyz',satuan:satuan},
										success: function(responseData) {
											$('.judulgrafik').html('Grafik Monitoring <b style="color:#000;">'+fileCsv+' Elapased terhadap Z-Axis</b>');
											$('.grafik img, .modal img').attr('src','./'+responseData+'?v='+Math.random() * (10000 - 1) + 1);
											$('.loaddata').css({'display':'none'});
										},
										error: function(jqXHR, textStatus, errorThrown) {
											$('.loaddata').css({'display':'none'});
										}
									});
								}
							},
							{
								text: 'P => XYZ',
								action: function ( e, dt, node, config ) {
									$('.loaddata').css({'display':'flex'});
									warna = '#'+Math.floor(Math.random()*16777215).toString(16);
									$.ajax({
										type: "POST",
										url: "/getGrafik",
										data: {dataGrafik:fileCsv+'.csv',warna:'r',dataGrafik1:'',dataGrafik2:'',warna3:'',warna4:'',warna5:'',warna6:'',warna7:'',warna8:'',satuan1:'',satuan2:'',warna:'r',warna1:'g',warna2:'b',jenis:'pxyz',satuan:satuan},
										success: function(responseData) {
											$('.judulgrafik').html('Grafik Monitoring <b style="color:#000;">'+fileCsv+' Elapased terhadap Z-Axis</b>');
											$('.grafik img, .modal img').attr('src','./'+responseData+'?v='+Math.random() * (10000 - 1) + 1);
											$('.loaddata').css({'display':'none'});
										},
										error: function(jqXHR, textStatus, errorThrown) {
											$('.loaddata').css({'display':'none'});
										}
									});
								}
							},
							{
								text: 'G => XYZ',
								action: function ( e, dt, node, config ) {
									$('.loaddata').css({'display':'flex'});
									warna = '#'+Math.floor(Math.random()*16777215).toString(16);
									$.ajax({
										type: "POST",
										url: "/getGrafik",
										data: {dataGrafik:fileCsv+'.csv',warna:'r',dataGrafik1:'',dataGrafik2:'',warna3:'',warna4:'',warna5:'',warna6:'',warna7:'',warna8:'',satuan1:'',satuan2:'',warna:'r',warna1:'g',warna2:'b',jenis:'gxyz',satuan:satuan},
										success: function(responseData) {
											$('.judulgrafik').html('Grafik Monitoring <b style="color:#000;">'+fileCsv+' Elapased terhadap Z-Axis</b>');
											$('.grafik img, .modal img').attr('src','./'+responseData+'?v='+Math.random() * (10000 - 1) + 1);
											$('.loaddata').css({'display':'none'});
										},
										error: function(jqXHR, textStatus, errorThrown) {
											$('.loaddata').css({'display':'none'});
										}
									});
								}
							},
							{
								text: 'W => XYZ',
								action: function ( e, dt, node, config ) {
									$('.loaddata').css({'display':'flex'});
									warna = '#'+Math.floor(Math.random()*16777215).toString(16);
									$.ajax({
										type: "POST",
										url: "/getGrafik",
										data: {dataGrafik:fileCsv+'.csv',warna:'r',dataGrafik1:'',dataGrafik2:'',warna3:'',warna4:'',warna5:'',warna6:'',warna7:'',warna8:'',satuan1:'',satuan2:'',warna:'r',warna1:'g',warna2:'b',jenis:'wxyz',satuan:satuan},
										success: function(responseData) {
											$('.judulgrafik').html('Grafik Monitoring <b style="color:#000;">'+fileCsv+' Elapased terhadap Z-Axis</b>');
											$('.grafik img, .modal img').attr('src','./'+responseData+'?v='+Math.random() * (10000 - 1) + 1);
											$('.loaddata').css({'display':'none'});
										},
										error: function(jqXHR, textStatus, errorThrown) {
											$('.loaddata').css({'display':'none'});
										}
									});
								}
							},
							{
								text: 'SC => XYZ',
								action: function ( e, dt, node, config ) {
									$('.loaddata').css({'display':'flex'});
									warna = '#'+Math.floor(Math.random()*16777215).toString(16);
									$.ajax({
										type: "POST",
										url: "/getGrafik",
										data: {dataGrafik:fileCsv+'.csv',warna:'r',dataGrafik1:'',dataGrafik2:'',warna3:'',warna4:'',warna5:'',warna6:'',warna7:'',warna8:'',satuan1:'',satuan2:'',warna:'r',warna1:'g',warna2:'b',jenis:'scxyz',satuan:satuan},
										success: function(responseData) {
											$('.judulgrafik').html('Grafik Monitoring <b style="color:#000;">'+fileCsv+' Elapased terhadap Z-Axis</b>');
											$('.grafik img, .modal img').attr('src','./'+responseData+'?v='+Math.random() * (10000 - 1) + 1);
											$('.loaddata').css({'display':'none'});
										},
										error: function(jqXHR, textStatus, errorThrown) {
											$('.loaddata').css({'display':'none'});
										}
									});
								}
							},
							{
								text: 'O => XYZ',
								action: function ( e, dt, node, config ) {
									$('.loaddata').css({'display':'flex'});
									warna = '#'+Math.floor(Math.random()*16777215).toString(16);
									$.ajax({
										type: "POST",
										url: "/getGrafik",
										data: {dataGrafik:fileCsv+'.csv',warna:'r',dataGrafik1:'',dataGrafik2:'',warna3:'',warna4:'',warna5:'',warna6:'',warna7:'',warna8:'',satuan1:'',satuan2:'',warna:'r',warna1:'g',warna2:'b',jenis:'oxyz',satuan:satuan},
										success: function(responseData) {
											$('.judulgrafik').html('Grafik Monitoring <b style="color:#000;">'+fileCsv+' Elapased terhadap Z-Axis</b>');
											$('.grafik img, .modal img').attr('src','./'+responseData+'?v='+Math.random() * (10000 - 1) + 1);
											$('.loaddata').css({'display':'none'});
										},
										error: function(jqXHR, textStatus, errorThrown) {
											$('.loaddata').css({'display':'none'});
										}
									});
								}
							}
						],
						"initComplete": function(settings, json) {
							$('.loaddata').css({'display':'none'});
						}
					});
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(errorThrown);
				}
			});
			$('.hapusitem').remove();
		});
		
		$('.menugrafikgabungan').on('click',function(){
			var url = $(this).attr('data-url');
			var fileCsv = 'Accelerometer';
			var fileCsv1 = 'Gyroscope';
			var fileCsv2 = 'Magnetometer';
			var satuan = ' (g)';
			var satuan1 = ' (deg/s)';
			var satuan2 = ' (T)';
			
			$('.loaddata').css({'display':'flex'});
			$('.isi').html('<table id = "acce"></table>');
			$.ajax({
				type: "POST",
				url: "/"+url,
				data: {},
				success: function(responseData) {
					var dataJson = JSON.parse(responseData.replace(/\&#34;/g, '"'));
					var t = $('#acce').DataTable({
						data: dataJson.data,
						columns: [
							{ title: "Time Stamp", "className": "text-center" },
							{ title: "Elapsed", "className": "text-center" },
							{ title: "Sub ID &amp; Grade ID", "className": "text-center" },
							{ title: "Position ID", "className": "text-center" }
						],
						'pageLength':5,
						searching: false,
						dom: 'Bfrtip',
						buttons: [{
								text: 'GE => XYZ',
								action: function ( e, dt, node, config ) {
									$('.loaddata').css({'display':'flex'});
									warna = '#'+Math.floor(Math.random()*16777215).toString(16);
									$.ajax({
										type: "POST",
										url: "/getGrafik",
										data: {
											dataGrafik:fileCsv+'.csv',dataGrafik1:fileCsv1+'.csv',dataGrafik2:fileCsv2+'.csv',
											warna:'r',warna1:'g',warna2:'b',
											warna3:'black',warna4:'#6e0fa3',warna5:'#a58007',
											warna6:'#df11c6',warna7:'#cdb50c',warna8:'#298390',
											jenis:'gexyz',satuan:satuan,satuan1:satuan1,satuan2:satuan2},
										success: function(responseData) {
											$('.judulgrafik').html('Grafik Monitoring <b style="color:#000;">'+fileCsv+', '+fileCsv1+' dan '+fileCsv2+' Gabungan Elapased terhadap Z-Axis</b>');
											$('.grafik img, .modal img').attr('src','./'+responseData+'?v='+Math.random() * (10000 - 1) + 1);
											$('.loaddata').css({'display':'none'});
										},
										error: function(jqXHR, textStatus, errorThrown) {
											$('.loaddata').css({'display':'none'});
										}
									});
								}
							},{
								text: 'GP => XYZ',
								action: function ( e, dt, node, config ) {
									$('.loaddata').css({'display':'flex'});
									warna = '#'+Math.floor(Math.random()*16777215).toString(16);
									$.ajax({
										type: "POST",
										url: "/getGrafik",
										data: {
											dataGrafik:fileCsv+'.csv',dataGrafik1:fileCsv1+'.csv',dataGrafik2:fileCsv2+'.csv',
											warna:'r',warna1:'g',warna2:'b',
											warna3:'black',warna4:'#6e0fa3',warna5:'#a58007',
											warna6:'#df11c6',warna7:'#cdb50c',warna8:'#298390',
											jenis:'gpxyz',satuan:satuan,satuan1:satuan1,satuan2:satuan2},
										success: function(responseData) {
											$('.judulgrafik').html('Grafik Monitoring <b style="color:#000;">'+fileCsv+', '+fileCsv1+' dan '+fileCsv2+' Gabungan Elapased terhadap Z-Axis</b>');
											$('.grafik img, .modal img').attr('src','./'+responseData+'?v='+Math.random() * (10000 - 1) + 1);
											$('.loaddata').css({'display':'none'});
										},
										error: function(jqXHR, textStatus, errorThrown) {
											$('.loaddata').css({'display':'none'});
										}
									});
								}
							},{
								text: 'GG => XYZ',
								action: function ( e, dt, node, config ) {
									$('.loaddata').css({'display':'flex'});
									warna = '#'+Math.floor(Math.random()*16777215).toString(16);
									$.ajax({
										type: "POST",
										url: "/getGrafik",
										data: {
											dataGrafik:fileCsv+'.csv',dataGrafik1:fileCsv1+'.csv',dataGrafik2:fileCsv2+'.csv',
											warna:'r',warna1:'g',warna2:'b',
											warna3:'black',warna4:'#6e0fa3',warna5:'#a58007',
											warna6:'#df11c6',warna7:'#cdb50c',warna8:'#298390',
											jenis:'ggxyz',satuan:satuan,satuan1:satuan1,satuan2:satuan2},
										success: function(responseData) {
											$('.judulgrafik').html('Grafik Monitoring <b style="color:#000;">'+fileCsv+', '+fileCsv1+' dan '+fileCsv2+' Gabungan Elapased terhadap Z-Axis</b>');
											$('.grafik img, .modal img').attr('src','./'+responseData+'?v='+Math.random() * (10000 - 1) + 1);
											$('.loaddata').css({'display':'none'});
										},
										error: function(jqXHR, textStatus, errorThrown) {
											$('.loaddata').css({'display':'none'});
										}
									});
								}
							},{
								text: 'GW => XYZ',
								action: function ( e, dt, node, config ) {
									$('.loaddata').css({'display':'flex'});
									warna = '#'+Math.floor(Math.random()*16777215).toString(16);
									$.ajax({
										type: "POST",
										url: "/getGrafik",
										data: {
											dataGrafik:fileCsv+'.csv',dataGrafik1:fileCsv1+'.csv',dataGrafik2:fileCsv2+'.csv',
											warna:'r',warna1:'g',warna2:'b',
											warna3:'black',warna4:'#6e0fa3',warna5:'#a58007',
											warna6:'#df11c6',warna7:'#cdb50c',warna8:'#298390',
											jenis:'gwxyz',satuan:satuan,satuan1:satuan1,satuan2:satuan2},
										success: function(responseData) {
											$('.judulgrafik').html('Grafik Monitoring <b style="color:#000;">'+fileCsv+', '+fileCsv1+' dan '+fileCsv2+' Gabungan Elapased terhadap Z-Axis</b>');
											$('.grafik img, .modal img').attr('src','./'+responseData+'?v='+Math.random() * (10000 - 1) + 1);
											$('.loaddata').css({'display':'none'});
										},
										error: function(jqXHR, textStatus, errorThrown) {
											$('.loaddata').css({'display':'none'});
										}
									});
								}
							},{
								text: 'GSC => XYZ',
								action: function ( e, dt, node, config ) {
									$('.loaddata').css({'display':'flex'});
									warna = '#'+Math.floor(Math.random()*16777215).toString(16);
									$.ajax({
										type: "POST",
										url: "/getGrafik",
										data: {
											dataGrafik:fileCsv+'.csv',dataGrafik1:fileCsv1+'.csv',dataGrafik2:fileCsv2+'.csv',
											warna:'r',warna1:'g',warna2:'b',
											warna3:'black',warna4:'#6e0fa3',warna5:'#a58007',
											warna6:'#df11c6',warna7:'#cdb50c',warna8:'#298390',
											jenis:'gscxyz',satuan:satuan,satuan1:satuan1,satuan2:satuan2},
										success: function(responseData) {
											$('.judulgrafik').html('Grafik Monitoring <b style="color:#000;">'+fileCsv+', '+fileCsv1+' dan '+fileCsv2+' Gabungan Elapased terhadap Z-Axis</b>');
											$('.grafik img, .modal img').attr('src','./'+responseData+'?v='+Math.random() * (10000 - 1) + 1);
											$('.loaddata').css({'display':'none'});
										},
										error: function(jqXHR, textStatus, errorThrown) {
											$('.loaddata').css({'display':'none'});
										}
									});
								}
							},{
								text: 'GO => XYZ',
								action: function ( e, dt, node, config ) {
									$('.loaddata').css({'display':'flex'});
									warna = '#'+Math.floor(Math.random()*16777215).toString(16);
									$.ajax({
										type: "POST",
										url: "/getGrafik",
										data: {
											dataGrafik:fileCsv+'.csv',dataGrafik1:fileCsv1+'.csv',dataGrafik2:fileCsv2+'.csv',
											warna:'r',warna1:'g',warna2:'b',
											warna3:'black',warna4:'#6e0fa3',warna5:'#a58007',
											warna6:'#df11c6',warna7:'#cdb50c',warna8:'#298390',
											jenis:'goxyz',satuan:satuan,satuan1:satuan1,satuan2:satuan2},
										success: function(responseData) {
											$('.judulgrafik').html('Grafik Monitoring <b style="color:#000;">'+fileCsv+', '+fileCsv1+' dan '+fileCsv2+' Gabungan Elapased terhadap Z-Axis</b>');
											$('.grafik img, .modal img').attr('src','./'+responseData+'?v='+Math.random() * (10000 - 1) + 1);
											$('.loaddata').css({'display':'none'});
										},
										error: function(jqXHR, textStatus, errorThrown) {
											$('.loaddata').css({'display':'none'});
										}
									});
								}
							}
						],
						"initComplete": function(settings, json) {
							$('.loaddata').css({'display':'none'});
						}
					});
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(errorThrown);
				}
			});
			$('.hapusitem').remove();
		});
	});