import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherCard } from './weather-card';
import { WeatherData } from '../../models/weather.model';

describe('WeatherCard', () => {
  let component: WeatherCard;
  let fixture: ComponentFixture<WeatherCard>;

  const mockWeather: WeatherData = {
    temperature: 22,
    condition: 'Sunny',
    humidity: 60,
    windSpeed: 15,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherCard],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherCard);
    component = fixture.componentInstance;

    // Set required @Input before detectChanges — omitting causes runtime error
    fixture.componentRef.setInput('weather', mockWeather);

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('initial render', () => {
    let paragraphs: NodeListOf<HTMLParagraphElement>;

    beforeEach(() => {
      paragraphs = fixture.nativeElement.querySelectorAll('p');
    });

    it('should render exactly 4 data paragraphs', () => {
      expect(paragraphs.length).toBe(4);
    });

    it('should render the temperature', () => {
      expect(paragraphs[0].textContent).toContain('Temperature: 22');
    });

    it('should render the condition', () => {
      expect(paragraphs[1].textContent).toContain('Condition: Sunny');
    });

    it('should render the humidity', () => {
      expect(paragraphs[2].textContent).toContain('Humidity: 60');
    });

    it('should render the wind speed', () => {
      expect(paragraphs[3].textContent).toContain('Wind Speed: 15');
    });
  });

  it('should display all weather fields in the template', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Temperature: 22');
    expect(text).toContain('Condition: Sunny');
    expect(text).toContain('Humidity: 60');
    expect(text).toContain('Wind Speed: 15');
  });

  it('should update DOM when weather input changes', () => {
    const updatedWeather: WeatherData = {
      temperature: 5,
      condition: 'Snowy',
      humidity: 85,
      windSpeed: 40,
    };

    fixture.componentRef.setInput('weather', updatedWeather);
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Temperature: 5');
    expect(text).toContain('Condition: Snowy');
    expect(text).toContain('Humidity: 85');
    expect(text).toContain('Wind Speed: 40');
    expect(text).not.toContain('Sunny');
    expect(text).not.toContain('Temperature: 22');
  });
});
