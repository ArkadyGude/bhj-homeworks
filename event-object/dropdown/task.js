document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(event) {
        const target = event.target;

        if (target.classList.contains('dropdown__value')) {
            event.preventDefault();
            const dropdown = target.closest('.dropdown');
            const dropdownList = dropdown.querySelector('.dropdown__list');

            document.querySelectorAll('.dropdown__list_active').forEach(list => {
                if (list !== dropdownList) {
                    list.classList.remove('dropdown__list_active');
                }
            });

            dropdownList.classList.toggle('dropdown__list_active');
        }

        else if (target.classList.contains('dropdown__link')) {
            event.preventDefault();
            const dropdownItem = target.closest('.dropdown__item');
            const dropdown = dropdownItem.closest('.dropdown');
            const dropdownValue = dropdown.querySelector('.dropdown__value');
            const dropdownList = dropdown.querySelector('.dropdown__list');
            
            dropdownValue.textContent = target.textContent.trim();
            dropdownList.classList.remove('dropdown__list_active');
        }

        else if (!target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown__list_active').forEach(list => {
                list.classList.remove('dropdown__list_active');
            });
        }
    });
});