var contador = 0;
var animales = [];
$('tbody').sortable();
var Persister = {
    save: function (key, value) {
        localStorage.setItem(key, value);
    },
    load: function(key, default_value) {
        return localStorage.getItem(key) || default_value;
    },
    saveObj: function(key, value) {
        var json_string = JSON.stringify(value);
        this.save(key, json_string);    
    },
    loadObj: function(key, default_value) {
        var json_string = this.load(key, default_value);
        return JSON.parse(json_string);
    }
};

function load_data() {
    contador = Persister.load('clicks', 1);
    animales = Persister.loadObj('animales', "[]");
    $('#contador').val(contador);

    $('#animales').html('');
    for (var i = 0; i < animales.length; i++) {
        $('#animales').append('<li>' + animales[i].nombre + '</li>');
    }
}

$(document).ready(function() {
    load_data();
    $('#incrementar').click(function() {
        contador++;
        Persister.save('clicks', contador);
        $('#contador').val(contador);
    });
    $('#save').click(function(event) {
        var animal = $('#animal').val();
        animales.push({nombre: animal});
        Persister.saveObj('animales', animales);
        $('#animales').append('<li>' + animal + '</li>');
    });
    $('#clear').click(function(event) {
        localStorage.clear();
        load_data();
    });
});
