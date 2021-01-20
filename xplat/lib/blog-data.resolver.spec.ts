import { TestBed } from '@angular/core/testing';

import { BlogDataResolver } from './blog-data.resolver';

describe('BlogDataResolver', () => {
  let resolver: BlogDataResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BlogDataResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
