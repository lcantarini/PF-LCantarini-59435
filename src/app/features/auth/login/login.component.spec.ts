import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginComponent } from "./login.component"
import { HttpClientTestingModule, provideHttpClientTesting } from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";
import { SharedModule } from "../../../shared/shared.module";

describe("LoginComponent", () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [HttpClientTestingModule, SharedModule],
            providers: [
                provideHttpClientTesting()
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
    });

    it('El compoente debe haber sido instanciado', () => {
        expect(component).toBeTruthy();
    });
});