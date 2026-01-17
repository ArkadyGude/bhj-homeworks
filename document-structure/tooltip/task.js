document.addEventListener('DOMContentLoaded', function() {
    let activeTooltip = null;
    const tooltipElements = document.querySelectorAll('.has-tooltip');
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    document.body.appendChild(tooltip);

    function calculatePosition(element, tooltipElement, position = 'top') {
        const rect = element.getBoundingClientRect();
        const tooltipRect = tooltipElement.getBoundingClientRect();
        
        let left, top;
        
        switch(position) {
            case 'top':
                left = rect.left + (rect.width - tooltipRect.width) / 2;
                top = rect.top - tooltipRect.height;
                break;
            case 'bottom':
                left = rect.left + (rect.width - tooltipRect.width) / 2;
                top = rect.bottom;
                break;
            case 'left':
                left = rect.left - tooltipRect.width;
                top = rect.top + (rect.height - tooltipRect.height) / 2;
                break;
            case 'right':
                left = rect.right;
                top = rect.top + (rect.height - tooltipRect.height) / 2;
                break;
            default:
                left = rect.left;
                top = rect.top - tooltipRect.height;
        }

        if (left < 5) left = 5;
        if (left + tooltipRect.width > window.innerWidth - 5) {
            left = window.innerWidth - tooltipRect.width - 5;
        }
        
        if (top < 5) {
            if (position === 'top') {
                return calculatePosition(element, tooltipElement, 'bottom');
            }
            top = 5;
        }
        
        return { left, top };
    }

    function handleTooltipClick(event) {
        event.preventDefault();
        
        const element = event.target;
        const title = element.getAttribute('title');
        const dataPosition = element.getAttribute('data-position') || 'top';

        if (activeTooltip === element) {
            tooltip.classList.remove('tooltip_active');
            activeTooltip = null;
            return;
        }

        tooltip.textContent = title;
        tooltip.classList.add('tooltip_active');

        const position = calculatePosition(element, tooltip, dataPosition);
        tooltip.style.left = position.left + 'px';
        tooltip.style.top = position.top + 'px';

        activeTooltip = element;
    }

    tooltipElements.forEach(element => {
        element.addEventListener('click', handleTooltipClick);
    });

    document.addEventListener('click', function(event) {
        if (activeTooltip && 
            !event.target.classList.contains('has-tooltip') &&
            event.target !== tooltip) {
            tooltip.classList.remove('tooltip_active');
            activeTooltip = null;
        }
    });

    window.addEventListener('scroll', function() {
        if (activeTooltip) {
            tooltip.classList.remove('tooltip_active');
            activeTooltip = null;
        }
    });
});