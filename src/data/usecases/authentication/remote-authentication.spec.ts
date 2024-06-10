import { faker } from "@faker-js/faker";

import { HttpPostClientSpy } from "@/data/test/http-client-mock";
import { authenticationMock } from "@/domain/test/authentication-mock";

import { RemoteAuthentication } from "./remote-authentication";

type SutType = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const makeSut = (url: string = faker.internet.url()): SutType => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return {
    sut,
    httpPostClientSpy,
  };
};

describe("RemoteAuthentication", () => {
  it("should call HttpPostClient with correct url", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth(authenticationMock());
    expect(httpPostClientSpy.url).toBe(url);
  });

  it("should call HttpPostClient with correct body", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const authenticationParams = authenticationMock();
    await sut.auth(authenticationParams);
    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });
});
