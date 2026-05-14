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
    illustrationKey: 'sunny',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherCard],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherCard);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('weather', mockWeather);
    fixture.componentRef.setInput('unit', 'metric');

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

    it('should wrap content in a .card element', () => {
      const card = fixture.nativeElement.querySelector('.card');
      expect(card).toBeTruthy();
    });

    it('should render exactly 4 data paragraphs', () => {
      expect(paragraphs.length).toBe(4);
    });

    it('should render the temperature', () => {
      expect(paragraphs[0].textContent).toContain('Temperature: 22.0°C');
    });

    it('should render the condition', () => {
      expect(paragraphs[1].textContent).toContain('Condition: Sunny');
    });

    it('should render the humidity', () => {
      expect(paragraphs[2].textContent).toContain('Humidity: 60');
    });

    it('should render the wind speed', () => {
      expect(paragraphs[3].textContent).toContain('Wind Speed: 15.0 km/h');
    });
  });

  it('should display all weather fields in the template', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Temperature: 22.0°C');
    expect(text).toContain('Condition: Sunny');
    expect(text).toContain('Humidity: 60');
    expect(text).toContain('Wind Speed: 15.0 km/h');
  });

  it('should update DOM when weather input changes', () => {
    const updatedWeather: WeatherData = {
      temperature: 5,
      condition: 'Snowy',
      humidity: 85,
      windSpeed: 40,
      illustrationKey: 'snowy',
    };

    fixture.componentRef.setInput('weather', updatedWeather);
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Temperature: 5.0°C');
    expect(text).toContain('Condition: Snowy');
    expect(text).toContain('Humidity: 85');
    expect(text).toContain('Wind Speed: 40.0 km/h');
    expect(text).not.toContain('Sunny');
    expect(text).not.toContain('Temperature: 22');
  });

  describe('imperial unit', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('unit', 'imperial');
      fixture.detectChanges();
    });

    it('should convert temperature to °F', () => {
      const text = fixture.nativeElement.textContent as string;
      expect(text).toContain('71.6°F');
    });

    it('should convert wind speed to mph', () => {
      const text = fixture.nativeElement.textContent as string;
      expect(text).toContain('9.3 mph');
    });
  });
});
