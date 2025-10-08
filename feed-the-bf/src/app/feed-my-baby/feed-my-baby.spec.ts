import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedMyBaby } from './feed-my-baby';

describe('FeedMyBaby', () => {
  let component: FeedMyBaby;
  let fixture: ComponentFixture<FeedMyBaby>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedMyBaby]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedMyBaby);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
