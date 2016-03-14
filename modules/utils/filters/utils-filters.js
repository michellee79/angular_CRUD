angular.module('angular-utils.filters', [])


.filter('orderObjectBy', function() {
    return function(items, field, reverse) {
        var filtered = [];
        angular.forEach(items, function(item , key) {
            item["key"] = key;
            filtered.push(item);
        });
        filtered.sort(function (a, b) {
            if(a[field] > b[field]) return 1;
            if(a[field] < b[field]) return -1;
            return 0;
        });
        if(reverse) filtered.reverse();
        //console.log(JSON.stringify(filtered));
        return filtered;
    };
})


.filter('capitalize', function() {
    return function(input, all) {
      return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    }
})