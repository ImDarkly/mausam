import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutfitCard } from './outfit-card';

describe('OutfitCard', () => {
  let component: OutfitCard;
  let fixture: ComponentFixture<OutfitCard>;

  const setup = async (items: string[]) => {
    await TestBed.configureTestingModule({
      imports: [OutfitCard],
    }).compileComponents();

    fixture = TestBed.createComponent(OutfitCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();
    await fixture.whenStable();
  };

  describe('with items', () => {
    beforeEach(() => setup(['t-shirt', 'light trousers', 'sunglasses']));

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render one <li> per item', () => {
      const items = fixture.nativeElement.querySelectorAll('li');
      expect(items.length).toBe(3);
    });

    it('should render each item label', () => {
      const text = fixture.nativeElement.textContent as string;
      expect(text).toContain('t-shirt');
      expect(text).toContain('light trousers');
      expect(text).toContain('sunglasses');
    });

    it('should not show the empty fallback', () => {
      const text = fixture.nativeElement.textContent as string;
      expect(text).not.toContain('No recommendations available.');
    });

    it('should update DOM when items input changes', () => {
      fixture.componentRef.setInput('items', ['heavy coat', 'gloves']);
      fixture.detectChanges();

      const text = fixture.nativeElement.textContent as string;
      expect(text).toContain('heavy coat');
      expect(text).toContain('gloves');
      expect(text).not.toContain('t-shirt');
    });
  });

  describe('with empty items', () => {
    beforeEach(() => setup([]));

    it('should show the empty fallback message', () => {
      const text = fixture.nativeElement.textContent as string;
      expect(text).toContain('No recommendations available.');
    });

    it('should render exactly one <li> (the fallback)', () => {
      const items = fixture.nativeElement.querySelectorAll('li');
      expect(items.length).toBe(1);
    });
  });

  describe('heading', () => {
    beforeEach(() => setup(['t-shirt']));

    it('should render the "What to wear" heading', () => {
      const h2 = fixture.nativeElement.querySelector('h2');
      expect(h2?.textContent?.trim()).toBe('What to wear');
    });
  });
});
