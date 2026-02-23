import { TestBed } from '@angular/core/testing';
import { FriendRequestsComponent } from './friend-requests.component';
import { TranslationService } from '../../../core/services/translation.service';
import { RouterModule } from '@angular/router';

describe('FriendRequestsComponent', () => {
  let translationServiceSpy: jasmine.SpyObj<TranslationService>;

  beforeEach(async () => {
    translationServiceSpy = jasmine.createSpyObj('TranslationService', ['translate']);
    translationServiceSpy.translate.and.callFake((key: string) => key);

    await TestBed.configureTestingModule({
      imports: [FriendRequestsComponent, RouterModule.forRoot([])],
      providers: [
        { provide: TranslationService, useValue: translationServiceSpy }
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(FriendRequestsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should default to received tab', () => {
    const fixture = TestBed.createComponent(FriendRequestsComponent);
    const component = fixture.componentInstance;
    expect(component.activeTab).toBe('received');
  });

  it('should switch to sent tab', () => {
    const fixture = TestBed.createComponent(FriendRequestsComponent);
    const component = fixture.componentInstance;
    component.setActiveTab('sent');
    expect(component.activeTab).toBe('sent');
  });

  it('should return only received pending requests', () => {
    const fixture = TestBed.createComponent(FriendRequestsComponent);
    const component = fixture.componentInstance;
    const received = component.receivedRequests;
    expect(received.every(r => r.direction === 'received' && r.status === 'pending')).toBeTrue();
  });

  it('should return only sent pending requests', () => {
    const fixture = TestBed.createComponent(FriendRequestsComponent);
    const component = fixture.componentInstance;
    const sent = component.sentRequests;
    expect(sent.every(r => r.direction === 'sent' && r.status === 'pending')).toBeTrue();
  });

  it('should accept a friend request', () => {
    const fixture = TestBed.createComponent(FriendRequestsComponent);
    const component = fixture.componentInstance;
    const requestId = component.receivedRequests[0].id;
    component.acceptFriendRequest(requestId);
    const request = component.friendRequests.find(r => r.id === requestId);
    expect(request?.status).toBe('accepted');
  });

  it('should decline a friend request', () => {
    const fixture = TestBed.createComponent(FriendRequestsComponent);
    const component = fixture.componentInstance;
    const requestId = component.receivedRequests[0].id;
    component.declineFriendRequest(requestId);
    const request = component.friendRequests.find(r => r.id === requestId);
    expect(request?.status).toBe('declined');
  });

  it('should format time ago in hours', () => {
    const fixture = TestBed.createComponent(FriendRequestsComponent);
    const component = fixture.componentInstance;
    translationServiceSpy.translate.and.callFake((key: string) => {
      if (key === 'friends.requests.time.hours') return '{{count}}h';
      return key;
    });
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    expect(component.getTimeAgo(twoHoursAgo)).toBe('2h');
  });

  it('should format time ago in days', () => {
    const fixture = TestBed.createComponent(FriendRequestsComponent);
    const component = fixture.componentInstance;
    translationServiceSpy.translate.and.callFake((key: string) => {
      if (key === 'friends.requests.time.days') return '{{count}} days';
      return key;
    });
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    expect(component.getTimeAgo(twoDaysAgo)).toBe('2 days');
  });

  it('should return correct trackBy value', () => {
    const fixture = TestBed.createComponent(FriendRequestsComponent);
    const component = fixture.componentInstance;
    const request = component.friendRequests[0];
    expect(component.trackByRequestId(0, request)).toBe(request.id);
  });
});
