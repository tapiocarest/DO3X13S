//------------- dashboard.js -------------//
$(document).ready(function() {

    //generate random number for charts
    randNum = function(){
        //return Math.floor(Math.random()*101);
        return (Math.floor( Math.random()* (1+40-20) ) ) + 20;
    }

    //------------- VCERTO API Handler -------------//
    var initial_data = {
        "systemview": {
            "activityDateTime" : ""
            ,"storage" : {
                "ecsa" : "0%"
                ,"esqa" : "0%"
                ,"sqa" : "0%"
                ,"csa" : "0%"
            }
            ,"spool" : "0%"
            ,"cpu" : {
                "ifa" : "0%"
                ,"iip" : "0%"
                ,"cp" : "0%"
            }
            ,"lcpu" : {
                "ifa" : "0%"
                ,"iip" : "0%"
                ,"cp" : "0%"
            }
        }
    };

    var vcerto = {}
    vcerto.interval = 10;
    vcerto.maximum = 50;
    vcerto.url = "https://api.tapioca.rest/system";
    vcerto.data = {
        count : 0
        ,updated : ""
        ,spool : 0
        ,storage : {
            avg : 0
            ,item : {
                ecsa : 0
                ,esqa : 0
                ,sqa : 0
                ,csa : 0
            }
        }
        ,cpu  : {
            total: []
            ,ifa: []
            ,iip: []
            ,cp: []
        }
        ,lcpu  : {
            total: []
            ,ifa: []
            ,iip: []
            ,cp: []
        }
    };
    vcerto.get_int = function(value, _default) {
        if (value) {
            return parseInt(value.replace(/\%/, ''));
        } else {
            return _default;
        }
    };
    vcerto.refresh_storage_device = function(parent, value, index) {
        var p = parent;
        if (index) {
            p = parent[index];
        }

        if (value > 0) {
            $(p).find("div.progress-bar").width(value+"%");
            $(p).find("div.progress").attr("data-original-title", value+"%");
            $(p).find("span.percent").text(value+"%");
        } else {
            $(p).find("div.progress-bar").width("0%");
            $(p).find("div.progress").attr("data-original-title", "0%");
            $(p).find("span.percent").text("...");
        }
    };
    vcerto.update_data = function(source, target, chart, count) {
        if (count) {
            target.push([count, source]);
        } else {
            target.push(source);
        }

        if (target.length > vcerto.maximum) {
            target = target.slice(1);
        }

        chart(target);

        return target;
    };
    vcerto.refresh = function(data, keepUpdating) {
        keepUpdating = (typeof keepUpdating !== 'undefined') ? keepUpdating : true;

        var charts = $('body').data('charts');

        this.data.count += 1;

        //----------------------------------------------------------------------------//
        // Update information about when last update happend
        if (data.systemview.activityDateTime) {
            this.data.updated = data.systemview.activityDateTime;
            $("#updated").text("updated on " + this.data.updated);
        } else {
            this.data.updated = "loading ...";
            $("#updated").text(this.data.updated);
        }

        //----------------------------------------------------------------------------//
        // Update Spool
        if (data.systemview.spool) {
            this.data.spool = parseInt(data.systemview.spool.replace(/\%/, ''))
        } else {
            this.data.spool = 0;
        }
        $(".spoolCircle").val(this.data.spool);
        $(".spoolCircle").trigger("change");

        //----------------------------------------------------------------------------//
        // Update Storage
        if (data.systemview.storage) {
            this.data.storage.item.ecsa = this.get_int(data.systemview.storage.ecsa, -1);
            this.data.storage.item.esqa = this.get_int(data.systemview.storage.esqa, -1);
            this.data.storage.item.sqa = this.get_int(data.systemview.storage.sqa, -1);
            this.data.storage.item.csa = this.get_int(data.systemview.storage.csa, -1);

            // TODO: Se algum item não for encontrado a média ficará inválida temporariamente.
            this.data.storage.avg = parseInt((this.data.storage.item.ecsa + this.data.storage.item.esqa + this.data.storage.item.sqa + this.data.storage.item.csa)/4);
        } else {
            this.data.storage.item.ecsa = -1;
            this.data.storage.item.esqa = -1;
            this.data.storage.item.sqa = -1;
            this.data.storage.item.csa = -1;
            this.data.storage.avg = -1;
        }

        this.refresh_storage_device($("#disk-space"), this.data.storage.avg);
        var storage_devices = $("#disk-space-device li");
        this.refresh_storage_device(storage_devices, this.data.storage.item.ecsa, 0);
        this.refresh_storage_device(storage_devices, this.data.storage.item.esqa, 1);
        this.refresh_storage_device(storage_devices, this.data.storage.item.sqa,  2);
        this.refresh_storage_device(storage_devices, this.data.storage.item.csa,  3);

        //----------------------------------------------------------------------------//
        // Update CPU
        var cpu = {};
        if (data.systemview.cpu) {
            cpu["ifa"] = this.get_int(data.systemview.cpu.ifa, -1);
            cpu["iip"] = this.get_int(data.systemview.cpu.iip, -1);
            cpu["cp"] = this.get_int(data.systemview.cpu.cp, -1);
            cpu["total"] = parseInt(cpu.ifa + cpu.iip + cpu.cp);
        } else {
            cpu["ifa"] = -1;
            cpu["iip"] = -1;
            cpu["cp"] = -1;
            cpu["total"] = -1;
        }
        this.data.cpu.total = this.update_data(cpu.total, this.data.cpu.total, charts.cpu.total, this.data.count);
        this.data.cpu.ifa = this.update_data(cpu.ifa, this.data.cpu.ifa, charts.cpu.ifa);
        this.data.cpu.iip = this.update_data(cpu.iip, this.data.cpu.iip, charts.cpu.iip);
        this.data.cpu.cp = this.update_data(cpu.cp, this.data.cpu.cp, charts.cpu.cp);

        //----------------------------------------------------------------------------//
        // Update LCPU
        cpu = {};
        if (data.systemview.lcpu) {
            cpu["ifa"] = this.get_int(data.systemview.lcpu.ifa, -1);
            cpu["iip"] = this.get_int(data.systemview.lcpu.iip, -1);
            cpu["cp"] = this.get_int(data.systemview.lcpu.cp, -1);
            cpu["total"] = parseInt(cpu.ifa + cpu.iip + cpu.cp);
        } else {
            cpu["ifa"] = -1;
            cpu["iip"] = -1;
            cpu["cp"] = -1;
            cpu["total"] = -1;
        }
        this.data.lcpu.total = this.update_data(cpu.total, this.data.lcpu.total, charts.lcpu.total, this.data.count);
        this.data.lcpu.ifa = this.update_data(cpu.ifa, this.data.lcpu.ifa, charts.lcpu.ifa);
        this.data.lcpu.iip = this.update_data(cpu.iip, this.data.lcpu.iip, charts.lcpu.iip);
        this.data.lcpu.cp = this.update_data(cpu.cp, this.data.lcpu.cp, charts.lcpu.cp);

        if (keepUpdating) {
            setTimeout(vcerto.load, this.interval * 1000);
        }
    };
    vcerto.retry = function(data, keepUpdating) {
        keepUpdating = (typeof keepUpdating !== 'undefined') ? keepUpdating : true;

        if (keepUpdating) {
            setTimeout(vcerto.load, vcerto.interval * 1000);
        }
    }

    vcerto.load = function() {
        $.ajax({
            url: vcerto.url,
            type: "GET",
            dataType: "json",
            success: vcerto.refresh,
            error: vcerto.retry
        });

        // var random_data = {
        //     "systemview": {
        //         "activityDateTime": "random data for test"
        //         ,"storage": {
        //             "ecsa": randNum() + "%"
        //             ,"esqa": randNum() + "%"
        //             ,"sqa": randNum() + "%"
        //             ,"csa": randNum() + "%"
        //         }
        //         ,"spool": randNum() + "%"
        //         ,"cpu": {
        //             "ifa": randNum() + "%"
        //             ,"iip": randNum() + "%"
        //             ,"cp": randNum() + "%"
        //         }
        //         ,"lcpu": {
        //             "ifa": randNum() + "%"
        //             ,"iip": randNum() + "%"
        //             ,"cp": randNum() + "%"
        //         }
        //     }
        // };
        // if (vcerto.data.count > 7 && vcerto.data.count < 15) {
        //     console.log("Remove item");
        //     delete random_data["systemview"]["lcpu"]["ifa"];
        // }
        // vcerto.refresh(random_data);
    }

    vcerto.start = function() {
        this.data.cpu.total.push([this.data.count, 0]);
        this.data.cpu.ifa.push(0);
        this.data.cpu.iip.push(0);
        this.data.cpu.cp.push(0);

        this.data.lcpu.total.push([this.data.count, 0]);
        this.data.lcpu.ifa.push(0);
        this.data.lcpu.iip.push(0);
        this.data.lcpu.cp.push(0);

        // this.data.count = 1;
        this.refresh(initial_data);
        // setTimeout(vcerto.load, 2000);
    }

    $('body').data("vcerto", vcerto);
});
