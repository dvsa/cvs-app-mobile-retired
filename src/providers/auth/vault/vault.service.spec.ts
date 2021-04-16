import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PlatformMock, StorageMock } from 'ionic-mocks';
import { AuthMode, IdentityVault } from '@ionic-enterprise/identity-vault';

import { VaultService } from './vault.service';
import { BrowserAuthService } from '../browser-auth/browser-auth.service';
import { BrowserAuthPlugin } from '../browser-auth/brower-auth.plugin';
import { LOCAL_STORAGE } from '../../../app/app.enums';

describe('VaultService', () => {
  let vaultService: VaultService;

  const browserAuthPluginMock = new BrowserAuthPlugin(
    new BrowserAuthService(StorageMock.instance())
  );

  beforeAll(() => {
    (window as any).IonicNativeAuth = new BrowserAuthPlugin(
      new BrowserAuthService(StorageMock.instance())
    );
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        VaultService,
        {
          provide: BrowserAuthPlugin,
          useValue: browserAuthPluginMock
        },
        { provide: Platform, useValue: PlatformMock.instance() },
        { provide: Storage, useValue: StorageMock.instance() }
      ]
    });
  });

  beforeEach(inject([VaultService], (service: VaultService) => {
    vaultService = service;
  }));

  it('injects', () => {
    expect(vaultService).toBeTruthy();
  });

  it('should the auth storage mode', () => {
    spyOn(vaultService, 'setAuthMode');

    vaultService.setDesiredAuthMode();
    expect(vaultService.setAuthMode).toHaveBeenCalledWith(AuthMode.SecureStorage);
  });

  it('should check if vault is locked', async () => {
    spyOn(vaultService, 'getVault').and.returnValue(Promise.resolve({ isLocked: () => true }));

    vaultService.isLocked();

    const isLocked = await vaultService.getVault();
    expect(vaultService.getVault).toHaveBeenCalled();
    expect(isLocked).toBeTruthy();
  });

  describe('obsfucatedId', () => {
    let vaultSpy: jasmine.Any;
    const obsId = '***-tester-1';

    beforeEach(() => {
      vaultSpy = jasmine.createSpyObj('IdentityVault', {
        storeValue: Promise.resolve(),
        getValue: Promise.resolve()
      });

      spyOn(vaultService, 'getVault').and.returnValue(Promise.resolve(vaultSpy));
    });

    it('should store tester obsfucated Id', async () => {
      vaultService.storeTesterObfuscatedId(obsId);

      const vault: IdentityVault = await vaultService.getVault();
      expect(vaultService.getVault).toHaveBeenCalled();
      expect(vault.storeValue).toHaveBeenCalledWith(LOCAL_STORAGE.OBSFUCATED_TESTER, obsId);
    });

    it('should get tester obsfucated Id', async () => {
      vaultService.getTesterObsfuscatedId();

      const vault: IdentityVault = await vaultService.getVault();
      expect(vaultService.getVault).toHaveBeenCalled();
      expect(vault.getValue).toHaveBeenCalledWith(LOCAL_STORAGE.OBSFUCATED_TESTER);
    });
  });
});
