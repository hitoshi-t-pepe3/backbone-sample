(function($){
    $(document).ready(function(){
        // start application code goes here
        var InvoiceItemModel = Backbone.Model.extend({
            defaults: {
                price: 0,
                quantity: 0
            },

            calculateAmount: function() {
                return this.get('price') * this.get('quantity');
            }
        });


        var PreviewInvoiceItemView = Backbone.View.extend({
            template: _.template('\
                          Price: <%= price %>.\
                          Quantity: <%= quantity %>.\
                          Amount: <%= amount %>.\
            '),

            render: function () {
                var html = this.template({
                    price: this.model.get('price'),
                    quantity: this.model.get('quantity'),
                    amount: this.model.calculateAmount()
                });
                $(this.el).html(html);
            }
        });

        var InvoiceListView = Backbone.View.extend({
            template: _.template('Displying list of  invoices'),
            render: function () {
                var html = this.template({});
                $(this.el).html(html);
            }
        });

        var Workspace = Backbone.Router.extend({
            routes: {
                '': 'invoiceList',
                'invoice': 'invoiceList',
            },

            invoiceList: function () {
                var invoiceListView = new InvoiceListView ({
                    el: 'body'
                });
                invoiceListView.render();
            }
        });



        var invoiceItemModel = new InvoiceItemModel({
            price: 2,
            quantity: 3
        });

        var previewInvoiceInVoiceItemView = new PreviewInvoiceItemView({
            model: invoiceItemModel,
            el: 'body'
        });

        // previewInvoiceInVoiceItemView.render();
        new Workspace();
        Backbone.history.start();
    });


})(jQuery);
