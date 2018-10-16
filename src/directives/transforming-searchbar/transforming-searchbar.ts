import {AfterViewInit, Directive, ElementRef, Input, OnDestroy, Renderer2} from '@angular/core';
import {Events} from "ionic-angular";

@Directive({
  selector: '[transforming-searchBar]'
})

export class TransformingSearchBarDirective implements AfterViewInit, OnDestroy {
  @Input() searchBarElemRef
  headerElemRef;

  constructor(private el: ElementRef, private renderer: Renderer2, public events: Events) {
    this.headerElemRef = el.nativeElement;
  }

  ngAfterViewInit() {
    let navBarElement = this.headerElemRef.querySelector('ion-navbar');
    let scrollContent = this.headerElemRef.nextElementSibling.querySelector('.scroll-content');

    this.searchBarElemRef.ionFocus.subscribe(
      () => {
        this.renderer.setStyle(scrollContent, 'margin-top', '50px');
        this.renderer.setStyle(scrollContent, 'margin-bottom', '250px');
        this.renderer.setStyle(navBarElement, 'display', 'none');
      }
    )

    this.searchBarElemRef.ionCancel.subscribe(
      () => {
        this.renderer.setStyle(scrollContent, 'margin-top', '130px');
        this.renderer.setStyle(scrollContent, 'margin-bottom', '0');
        this.renderer.setStyle(navBarElement, 'display', 'block');
      }
    )

    this.events.subscribe('navToDetails',
      () => {
        this.setDefaultCss(scrollContent, navBarElement);
      }
    )
  }

  ngOnDestroy() {
    this.searchBarElemRef.ionFocus.unsubscribe();
    this.searchBarElemRef.ionCancel.unsubscribe();
    this.events.unsubscribe('navToDetails');
  }

  private setDefaultCss(scrollContent, navBarElement): void {
    this.renderer.setStyle(scrollContent, 'margin-top', '130px');
    this.renderer.setStyle(scrollContent, 'margin-bottom', '0');
    this.renderer.setStyle(navBarElement, 'display', 'block');
  }

}
