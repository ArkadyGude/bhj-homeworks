document.addEventListener('DOMContentLoaded', function() {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    document.body.appendChild(tooltip);
    
    let activeElement = null;

    function hideTooltip() {
        tooltip.classList.remove('tooltip_active');
        if (activeElement) {
            activeElement.classList.remove('tooltip-clicked');
            activeElement = null;
        }
    }
    
    function positionTooltip(element, tooltipElement) {
        const rect = element.getBoundingClientRect();
        const position = element.dataset.position || 'top';
        const tooltipRect = tooltipElement.getBoundingClientRect();
        
        let left, top;
        
        switch(position) {
            case 'top':
                left = rect.left + window.pageXOffset + (rect.width - tooltipRect.width) / 2;
                top = rect.top + window.pageYOffset - tooltipRect.height - 10;
                break;
            case 'bottom':
                left = rect.left + window.pageXOffset + (rect.width - tooltipRect.width) / 2;
                top = rect.bottom + window.pageYOffset + 10;
                break;
            case 'left':
                left = rect.left + window.pageXOffset - tooltipRect.width - 10;
                top = rect.top + window.pageYOffset + (rect.height - tooltipRect.height) / 2;
                break;
            case 'right':
                left = rect.right + window.pageXOffset + 10;
                top = rect.top + window.pageYOffset + (rect.height - tooltipRect.height) / 2;
                break;
            default:
                left = rect.left + window.pageXOffset + (rect.width - tooltipRect.width) / 2;
                top = rect.top + window.pageYOffset - tooltipRect.height - 10;
        }
        
        const margin = 5;

        if (left < margin) left = margin;
        if (left + tooltipRect.width > window.innerWidth - margin) {
            left = window.innerWidth - tooltipRect.width - margin;
        }

        if (top < margin) top = margin;
        if (top + tooltipRect.height > window.innerHeight - margin) {
            top = window.innerHeight - tooltipRect.height - margin;
        }
        
        tooltipElement.style.left = `${left}px`;
        tooltipElement.style.top = `${top}px`;
    }
    
    function showTooltip(element) {
        if (activeElement === element) {
            hideTooltip();
            return;
        }
        
        hideTooltip();
        
        tooltip.textContent = element.getAttribute('title');
        
        tooltip.classList.add('tooltip_active');
        
        positionTooltip(element, tooltip);
        
        activeElement = element;
        activeElement.classList.add('tooltip-clicked');
    }
    
    const tooltipElements = document.querySelectorAll('.has-tooltip');
    
    tooltipElements.forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            
            const title = this.getAttribute('title');
            this.removeAttribute('title');
            
            showTooltip(this);
            
            setTimeout(() => {
                this.setAttribute('title', title);
            }, 100);
        });
    });
    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.has-tooltip') && !e.target.closest('.tooltip')) {
            hideTooltip();
        }
    });
    
    window.addEventListener('scroll', function() {
        if (activeElement) {
            positionTooltip(activeElement, tooltip);
        }
    });
    
    window.addEventListener('resize', function() {
        if (activeElement) {
            positionTooltip(activeElement, tooltip);
        }
    });
});