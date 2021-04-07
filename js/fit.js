(() => {
    'use strict';

    const howMany = {};
    let itemOneItems = '';
    let itemTwoItems = '';
    let itemOneValue = 0;
    let itemTwoValue = 0;
    let items;
    fetch('data.json?d=20210406')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            items = data;
            howMany.populateDataList(items);
            howMany.findItem = function (itemName) {
                const item = items.find((element) => element.item === itemName);
                if (item !== undefined) {
                    return item.cubicmiles;
                }
                return 0;
            };

            const itemOneDataList = document.getElementById('itemOneInput');
            itemOneDataList.addEventListener('change', (event) => {
                const itemValue = howMany.findItem(event.target.value);
                document.getElementById('one').innerHTML = howMany.generateItemText(event.target.value, itemValue);

                itemOneItems = event.target.value;
                itemOneValue = itemValue;
                howMany.displayWinner();
            });

            const itemTwoDataList = document.getElementById('itemTwoInput');
            itemTwoDataList.addEventListener('change', (event) => {
                const itemValue = howMany.findItem(event.target.value);
                document.getElementById('two').innerHTML = howMany.generateItemText(event.target.value, itemValue);

                itemTwoItems = event.target.value;
                itemTwoValue = itemValue;
                howMany.displayWinner();
            });
        });

    howMany.generateItemText = function (item, itemValue) {
        return `${item} - ${new Intl.NumberFormat().format(itemValue)} mi&sup3;`;
    };

    howMany.populateDataList = function (items) {
        const itemOneList = document.getElementById('itemOne');
        items.forEach((item) => {
            let option = document.createElement('option');
            option.value = item.item;
            itemOneList.appendChild(option);
        });
        const itemTwoList = document.getElementById('itemTwo');
        items.forEach((item) => {
            let option = document.createElement('option');
            option.value = item.item;
            itemTwoList.appendChild(option);
        });
    };

    howMany.displayWinner = function () {
        const winner = document.getElementById('winner');
        if (itemOneValue && itemTwoValue) {
            const message = `${new Intl.NumberFormat().format(itemTwoValue / itemOneValue)} ${itemOneItems} can fit inside ${itemTwoItems}`;
            winner.innerHTML = message;
        }
    };

    const reset = document.getElementById('reset');
    reset.addEventListener('click', (event) => {
        document.getElementById('one').innerHTML = '';
        document.getElementById('itemOneInput').value = '';
        document.getElementById('two').innerHTML = '';
        document.getElementById('itemTwoInput').value = '';
        itemOneItems = '';
        itemTwoItems = '';
        itemOneValue = 0;
        itemTwoValue = 0;
        document.getElementById('winner').innerHTML = 'Please choose items for comparison.';
    });
})();
