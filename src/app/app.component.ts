import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import multipleConfig from './config/config';
import get from 'lodash/get';

declare global {
  interface Window {
    pie: any;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'pie-angular-boilerplate';
  env = {mode: 'evaluate'};
  config: any;
  state: any;
  tagName: any;
  controller: any;
  @ViewChild('author') author: ElementRef;
  @ViewChild('player1') player1: ElementRef;


  getController = (elem) => get(window.pie, `default.${elem}.controller`);

  parsePackage = (input) => {
    /**
     * This is a function that will take a string and return a valid package
     */
    const RE_SCOPED = /^(@[^/]+\/[^/@]+)(?:\/([^@]+))?(?:@([\s\S]+))?/;
    const RE_NORMAL = /^([^/@]+)(?:\/([^@]+))?(?:@([\s\S]+))?/;
    if (typeof input !== 'string') {
      throw new TypeError('Expected a string');
    }
    const matched = input.charAt(0) === '@' ? input.match(RE_SCOPED) : input.match(RE_NORMAL);
    if (!matched) {
      throw new Error(`[parse-package-name] "${input}" is not a valid string`);
    }
    return {
      name: matched[1],
      path: matched[2] || '',
      version: matched[3] || ''
    };
  }

  constructor(public renderer: Renderer2) {
    const config = multipleConfig.config;
    this.state = {
      config,
      session: {},
      env: this.env,
      score: 0
    };
  }

  ngAfterViewInit(): void {
    this.author.nativeElement.config = multipleConfig.config;
    this.renderer.listen(this.author.nativeElement, 'model.updated', (event) => {
      this.modelUpdated(event);
    });
    this.player1.nativeElement.config = multipleConfig.config;
    this.renderer.listen(this.player1.nativeElement, 'session-changed', (event) => {
      console.log('Here');
      this.sessionChanged(event);
    });
  }

  async getScore(): Promise<void> {
    const {config, session, env} = this.state;
    this.controller = this.getController(this.tagName);
    if (this.controller) {
      const {score} = await this.controller.outcome(config.models[0], session.data[0], env);
      this.state.score = score;
    }
    console.log('Score', this.state.score);
  }

  sessionChanged(event: any): void {
    if (this.player1.nativeElement) {
      this.state.session = this.player1.nativeElement.session;
    }
    this.getScore();
  }

  modelUpdated(event: any): void {
    const config = this.state.config;
    this.player1.nativeElement.config = {...config, models: [event.detail.update]};
  }

  ngOnInit(): void {
    this.tagName = this.parsePackage(get(this.state.config, 'elements.pie-multiple-choice')).name;
  }
}
