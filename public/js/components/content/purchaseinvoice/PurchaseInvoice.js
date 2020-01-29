/* 
 * Copyright (C) 2019 kirenj
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
 */
import Table from '../../elements/Table.js';
import Button from '../../elements/Button.js';
import CheckBoxInline from '../../elements/CheckBoxInline.js';
import Select from '../../elements/Select.js';
import SelectLabel from '../../elements/SelectLabel.js';
import ModalForm from '../../elements/ModalForm.js';
import Label from '../../elements/Label.js';
import Required from '../../elements/Required.js';
import Input from '../../elements/Input.js';
import TextArea from '../../elements/TextArea.js';

let data = [
    [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ],
    [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750" ],
    [ "Ashton Cox&", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000" ],
    [ "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060" ],
    [ "Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700" ],
    [ "Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000" ],
    [ "Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500" ],
    [ "Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900" ],
    [ "Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500" ],
    [ "Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600" ],
    [ "Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560" ],
    [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ],
    [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750" ],
    [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000" ],
    [ "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060" ],
    [ "Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700" ],
    [ "Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000" ],
    [ "Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500" ],
    [ "Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900" ],
    [ "Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500" ],
    [ "Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600" ],
    [ "Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560" ],
    [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ],
    [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750" ],
    [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000" ],
    [ "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060" ],
    [ "Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700" ],
    [ "Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000" ],
    [ "Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500" ],
    [ "Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900" ],
    [ "Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500" ],
    [ "Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600" ],
    [ "Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560" ],
    [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ],
    [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750" ],
    [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000" ],
    [ "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060" ],
    [ "Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700" ],
    [ "Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000" ],
    [ "Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500" ],
    [ "Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900" ],
    [ "Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500" ],
    [ "Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600" ],
    [ "Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560" ],
    [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ],
    [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750" ],
    [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000" ],
    [ "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060" ],
    [ "Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700" ],
    [ "Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000" ],
    [ "Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500" ],
    [ "Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900" ],
    [ "Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500" ],
    [ "Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600" ],
    [ "Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560" ],
    [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ],
    [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750" ],
    [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000" ],
    [ "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060" ],
    [ "Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700" ],
    [ "Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000" ],
    [ "Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500" ],
    [ "Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900" ],
    [ "Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500" ],
    [ "Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600" ],
    [ "Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560" ]
];

class PurchaseInvoice {
    
    constructor() {
        
    }
    
    render() {
        $(document).ready(function() {
            $(document).on("click", "#purchaseinvoice", function(){
                let selectedrow = {};
                let swaltext = document.createElement("p");

                function nothingSelectedSWAL() {
                    swal({
                        title: "Nothing Selected!",
                        text: "Please select a record to proceed.",
                        icon: "info",
                        closeOnClickOutside: false,
                        closeOnEsc: false,
                        buttons: {
                            confirm: {
                                text: "OK"
                            }
                        }
                    });
                }

                    let purchase_invoice = $('#purchase-invoice').DataTable({
                        paging: false,
                        info: false,
                        scrollY: 225,
                        scrollCollapse:true,
                        processing: true,
                        responsive: true,
                        columns: [
                            { title: "PI #" },
                            { title: "Vendor Code" },
                            { title: "Vendor Name" },
                            { title: "Created Date" },
                            { title: "Created By" },
                            { title: "Referance No" },
                            { title: "Document No" }
                        ],
                        dom: "Bfrtip",
                        buttons: [
                            {
                                text: "Generate Purchase Invoice(s)",
                                className: "btn btn-raised btn-primary waves-effect waves-light",
                                action: function() {                            
                                    $.blockUI({
                                        message: new ModalForm('purchase-invoice-modal', 'New Purchase Invoice(s)', { form_method: "POST", form_id: "purchase-invoice", form_enctype: "application/x-www-form-urlencoded" },
                                            [ 
                                                new Label('purchase-request-requirement', [], [], 'Purchase Requirement' + Required ).render() + new TextArea([], 'purchase-request-requirement', { required: true, rows:10 }).render(), 
                                                new Label('purchase-request-by', [], [], 'Purchase Requested By').render() + new Input('text', [], 'purchase-request-by', {}).render()
                                            ],
                                            [ 
                                                new Button(['btn-raised', 'btn-warning'], 'discard', 'Discard').render(), 
                                                new Button(['btn-raised', 'btn-secondary'], 'save', 'Save').render(), 
                                                new Button(['btn-raised', 'btn-success'], 'send-for-approval', 'Send for Approval').render()
                                            ]).render()
                                    });
                                    //adjusting the view
                                    //$('#purchase-request-by').parent().parent().removeClass("col").addClass("col-md-4");
                                    //inspired by https://jsfiddle.net/u2cdfsmq/2/
                                }
                            }
                        ],
                        initComplete: function() {
                            this.api().buttons().container().append(new CheckBoxInline([], {}, 'global', 'all', 'Global Purchase Invoices').render() + 
                                    new CheckBoxInline([], {}, 'self', 'self', 'Created By Me').render());
                        }
                    });


                    //inspired by https://stackoverflow.com/questions/31586354/jquery-datatables-scroll-to-bottom-when-a-row-is-added
                    let $scrollBody = $(purchase_invoice.table().node()).parent();
                    $scrollBody.scrollTop($scrollBody.get(0).scrollHeight);

                    let purchase_invoice_lines = $('#purchase-invoice-lines').DataTable({
                        paging: false,
                        info: false,
                        scrollY: 225,
                        scrollCollapse:true,
                        columns: [
                            { title: "PO#" },
                            { title: "Invoice #" },
                            { title: "Invoice Date" },
                            { title: "Currency" },
                            { title: "Amount" }
                        ]
                    });

                    purchase_invoice.on('click', 'tr', function() {
                        if (!$(this).hasClass("selected")) {
                            purchase_invoice.$('tr.selected').removeClass("selected");
                            $(this).addClass("selected");
                            selectedrow.purchase_invoice = purchase_invoice.row(this).data();
                            if (purchase_invoice_lines.rows().data()) {
                                purchase_invoice_lines.clear();
                            }
                            purchase_invoice_lines.rows.add(data).draw();
                        }
                    });

//                        purchase_invoice.on('dblclick', 'tr', function() {
//                            selectedrow.purchase_invoice = purchase_invoice.row(this).data();
//                            $.blockUI({
//                                message: new ModalForm('purchase-request-modal', 'View Purchase Order', { form_method: "POST", form_id: "purchase-order", form_enctype: "application/x-www-form-urlencoded" }, [ Label('purchase-request-requirement', [], [], 'Purchase Requirement' + Required ) + TextArea([], 'purchase-request-requirement', { required: true, rows:10 }), Label('purchase-request-by', [], [], 'Purchase Requested By') + Input('text', [], 'purchase-request-by') ], [ Button(['btn-raised', 'btn-warning'], 'discard', 'Discard'), Button(['btn-raised', 'btn-secondary'], 'save', 'Save'), Button(['btn-raised', 'btn-success'], 'send-for-approval', 'Send for Approval') ] ).render()
//                            });
//                            //adjusting the view
//                            $('#purchase-request-by').parent().parent().removeClass("col").addClass("col-md-4");
//                            //inspired by https://jsfiddle.net/u2cdfsmq/2/
//                            $('textarea').on('input', function() {
//                                //write a limit
//                                $(this).height('auto');
//                                $(this).height($(this)[0].scrollHeight + 'px');
//                            });
//                            $('#purchase-request-requirement').val(selectedrow.purchase_invoice[1] + ' ' + selectedrow.purchase_invoice[1]);
//                            $('#purchase-request-by').val(selectedrow.purchase_invoice[0]);
//                        });

                    $(document).on('click', '#discard', function() {
                        $.unblockUI();
                        document.body.style.overflowY = "auto";
                    });

                    //fixing a bug with datatables scrollY when on firefox
                    if (Browser.name === "firefox") {
                        $('div.dataTables_scrollBody').css('padding-right', "6px");
                    }
                    //fixing bug with datatable search
                    $('input[type="search"]').addClass("form-control");
                    //remove the data table button styling
                    $('.dt-button').removeClass("dt-button");
            });
        });
        return(
            '<div class="row">' +
                '<div class="col-12">' +
                    '<div class="card">' +
                        '<div class="card-body">' +
                            '<h5 class="card-title text-center"> Purchase Invoices </h5>' +
                            new Table('purchase-invoice', ['table', 'table-bordered', 'table-striped', 'table-hover']).render() +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="row">' +
                '<div class="col-12">' +
                    '<div class="card">' +
                        '<div class="card-body">' +
                            '<h5 class="card-title text-center"> Purchase Invoice Lines </h5>' +
                            new Table('purchase-invoice-lines', ['table', 'table-bordered', 'table-striped', 'table-hover']).render() +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );
    }
    
}

export default new PurchaseInvoice().render();