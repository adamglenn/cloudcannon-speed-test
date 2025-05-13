$(function(){

    var $container = $('.grid');
    var initialOptions = {
      itemSelector : '.element-item',
      masonry: {
        columnWidth: 80
      },
      getSortData: {
        programType: function( $elem ) {
          return $elem.attr('data-program-type');
        },
        school: function( $elem ) {
          return $elem.attr('data-school');
        },
        includeMinor: function( $elem ) {
          return $elem.attr('data-include-minor');
        },
        deliveryOption: function( $elem ) {
          return $elem.attr('data-delivery-option');
        }
      }
    };
    // build a hash for all our options
    var options = {
      // special hash for combination filters
      comboFilters: {}
    };

    // filter buttons
    $('.filter').on( 'click', 'input', function( event ) {
      event.preventDefault();
      var $this = $(this);
      // don't proceed if already selected
      if ( $this.hasClass('selected') ) {
        return false;
      }

      // console.log('hello world');
      var $optionSet = $this.parents('.option-set');
      var group = $optionSet.attr('data-filter-group');
      options.comboFilters[ group ] = $this.attr('data-filter-value');
      $.bbq.pushState( options );
    });

    var $sortBy = $('#sort-by').on( 'click', 'input', function( event ) {
      event.preventDefault();
      var $this = $(this);
      // don't proceed if already selected
      if ( $this.hasClass('selected') ) {
        return false;
      }
      options.sortBy = $this.attr('data-option-value');
      // console.log( options );
      $.bbq.pushState( options );
    });

    function selectLink( $link ) {
      $link.parents('.option-set').find('.selected').removeClass('selected');
      $link.parents('.option-set').find('.active').removeClass('active');
      $link.parents('.option-set').find('.active').removeAttr('checked');
      $link.addClass('selected');
      $link.addClass('active');
      $link.attr('checked', 'checked');
    }

    var location = window.location;
    var $comboFilterOptionSets = $('.combo-filters .option-set');

    function getComboFilterSelector( comboFilters ) {
      // build filter
      var isoFilters = [];
      var filterValue, $link, $optionSet;
      for ( var prop in comboFilters ) {
        filterValue = comboFilters[ prop ];
        isoFilters.push( filterValue );
        // change selected combo filter link
        $optionSet = $comboFilterOptionSets.filter('[data-filter-group="' + prop + '"]');
        $link = $optionSet.find('input[data-filter-value="' + filterValue + '"]');
        selectLink( $link );
      }
      var selector = isoFilters.join('');
      return selector;
    }

    window.addEventListener("hashchange", () => {
      // get options from hash
      if ( location.hash ) {
        $.extend( options, $.deparam.fragment( location.hash, true ) );
      }
      // build options from hash and initial options
      var isoOptions = $.extend( {}, initialOptions, options );

      if ( options.comboFilters ) {
        isoOptions.filter = getComboFilterSelector( options.comboFilters );
      }

      // change selected link for sortBy
      if ( options.sortBy ) {
        var $link = $sortBy.find('input[data-option-value="' + options.sortBy + '"]');
        selectLink( $link );
      }

      $container.isotope( isoOptions );
    })

    window.addEventListener("load", (event) => {
        console.log("page is fully loaded");
        window.dispatchEvent(new Event('hashchange'))
    });
    // trigger hashchange to capture initial hash options

  });